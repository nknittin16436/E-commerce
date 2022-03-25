const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        tirm: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxlength: [8, "Price cannot exceed 8 character"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product stock"],
        maxlength: [4, "Stock cannot exceed more than 9999"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true
            },
            name: {
                type: String,
                required: [true, "Please Enter Reviewer Name"],
                tirm: true
            },
            rating:{
                type: Number,
                required:true
            },
            comment:{
                type: String,
                required: [true, "Please Enter Review Comment"],
            }
        }
    ],
    //which user added the product
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Product",productSchema);