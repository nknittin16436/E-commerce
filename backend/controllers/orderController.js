
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


//Create New Order
exports.newOrder=catchAsyncError(async(req,res,next)=>{

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,

    }=req.body;


    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id

    });
    res.status(201).json({success:true,order});
});

/////////////**************************************GET SINGLE ORDER ********************************************************************************************/
exports.getSingleOrder=catchAsyncError(async (req,res,next)=>{
    //populate will take user id from order and find name and email corresponding to it in user collection
    // const order=await Order.findById(req.params.id).populate("user","name email");
    const order=await Order.findById(req.params.id).populate("user","name");

    if(!order){
       return next(new ErrorHandler("Order not fount with this Id"),404);
    }

    res.status(200).json({
        success:true,
        order,
    });
}); 




/////////////**************************************GET LOGGED IN USER ORDER ********************************************************************************************/
exports.myOrders=catchAsyncError(async (req,res,next)=>{
    const order =await Order.find({user:req.user._id});
    // const order =await Order.find();
    res.status(200).json({
        success:true,
        order,
    })
});