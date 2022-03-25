const Product = require("../models/productModel");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// CREATE PRODUCT --Admin
// exports.createProduct = async (req, res, next) => {

//       try {

//             const product = await Product.create(req.body);
//             res.status(200).json({ success: true, product });
//       } catch (error) {
//             res.status(500).json({ error, message: "Product can't be created" });
//       }

// }s

//      SECOND METHOD OF TRY CATCH

exports.createProduct = catchAsyncError(async (req, res, next) => {
      //which user added the product
      req.body.user = req.user.id;
      const product = await Product.create(req.body);
      res.status(200).json({ success: true, product });
});

// GET ALL PRODUCT

exports.getAllProducts = catchAsyncError(async (req, res) => {
      // try {

      //       const products = await Product.find();
      //       res.status(200).json({ success: true, products });
      // } catch (error) {
      //       res.status(500).json({ error, message: "Cant get Products" });
      // }

      //  const products = await Product.find();

      //FOR SEACRHING FOR SPECIFIC KEYWORD

      //FOR RESULT PER PAGE
      const resultPerPage = 5;
      const productCount = await Product.countDocuments();
      const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
      const products = await apiFeature.query;
      res.status(200).json({ success: true, products, productCount });
});

// UPDATE PRODUCT--Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
      try {
            let product = await Product.findById(req.params.id);

            //WAY 1
            // if (!product) {

            //       return res.status(500).json({ success: false, message: "Product not found" });
            // }

            //WAY 2
            if (!product) {
                  return next(new ErrorHandler("Product not found", 404));
            }

            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                  new: true,
                  runValidators: true,
                  useFindAndMOdify: false,
            });
            return res
                  .status(200)
                  .json({
                        success: true,
                        message: "Product updated Successfully",
                        product,
                  });
      } catch (error) {
            res.status(500).json({ error, message: "Cant Update Product" });
      }
});

//DELETE PRODUCT--ADMIN
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
      try {
            let product = await Product.findById(req.params.id);

            if (!product) {
                  return next(new ErrorHandler("Product not found", 404));
            }

            await product.remove();

            return res
                  .status(200)
                  .json({ success: true, message: "Product Deleted Successfully" });
      } catch (error) {
            res.status(500).json({ error, message: "Cant delete Product" });
      }
});

//GET PRODUCT DETAILS

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
      try {
            let product = await Product.findById(req.params.id);

            if (!product) {
                  return next(new ErrorHandler("Product not found", 404));
            }

            res.status(200).json({ success: true, product });
      } catch (error) {
            res.status(500).json({ error, message: "Cant Get Product" });
      }
});

//catchAsyncError is another way to implement try and catch block

/*******************************************************************CREATE A REVIEW AND EDIT IT************************************************************************ */

exports.createProductReview = catchAsyncError(async (req, res, next) => {
      const { rating, comment, productId } = req.body;
      const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment,
      };

      const product = await Product.findById(productId);

      const isReviewed = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
      );
      if (isReviewed) {
            product.reviews.forEach(rev => {
                  if (rev.user.toString() === req.user._id.toString()) {

                        rev.rating = rating;
                        rev.comment = comment;
                  }

            });

      } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
      }
      let avg = 0;
      product.ratings = product.reviews.forEach((rev) => {
            avg += rev.rating
      })
      product.ratings = avg / product.reviews.length

      await product.save({ validateBeforeSave: false });


      res.status(200).json({ success: true })
});



/************************************************************************GET ALL PRODUCT REVIEWS ***************/


exports.getProductReviews = catchAsyncError(async (req, res, next) => {

      let product = await Product.findById(req.query.id);

      if (!product) {
            return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({ success: true, reviews: product.reviews });


});


/************************************************************************DELETE  PRODUCT REVIEWS ***************/


exports.deleteProductReview = catchAsyncError(async (req, res, next) => {

      let product = await Product.findById(req.query.productId);

      if (!product) {
            return next(new ErrorHandler("Product not found", 404));
      }

      const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

      let avg = 0;
      reviews.forEach((rev) => {
            avg += rev.rating
      })
      const ratings = avg / reviews.length;
      const numOfReviews = reviews.length;


      await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
      }, {
            new: true,
            runValidators: true,
            useFindAndMOdify: false
      })


      res.status(200).json({ success: true });


});