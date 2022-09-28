
const Order = require("../models/orderModel");
const Product = require('../models/productModel');
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


//Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

    } = req.body;


    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id

    });
    res.status(201).json({ success: true, order });
});

/////////////**************************************GET SINGLE ORDER ********************************************************************************************/
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    //populate will take user id from order and find name and email corresponding to it in user collection
    // const order=await Order.findById(req.params.id).populate("user","name email");

    /***************************************TO DO POPULATE */
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not fount with this Id"), 404);
    }

    res.status(200).json({
        success: true,
        order,
    });
});




/////////////**************************************GET LOGGED IN USER ORDER ********************************************************************************************/
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        orders,
    })
});



/////////////**************************************GET ALL ORDERS-- ADMIN ********************************************************************************************/
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
});



/////////////**************************************UPDATE ORDER STAUS -- ADMIN ********************************************************************************************/
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not fount with this Id"), 404);
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);
        })
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    })
});
/////////////**************************************DELTEE ORDER -- ADMIN ********************************************************************************************/
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not fount with this Id"), 404);
    }

    await order.remove();
    res.status(200).json({
        success: true,
    })
});

//FUNCTION TO UPDATE STOCK OF PRODUCT
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    console.log(product);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
} 