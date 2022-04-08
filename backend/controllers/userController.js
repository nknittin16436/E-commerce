const Product = require('../models/User');
const ErrorHandler = require('../utils/Errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
dotenv.config({ path: 'backend/config/config.env' });
const cloudinary = require('cloudinary');



/****************************************************REGISTER USER ****************************************************************/
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url:myCloud.secure_url
        }

    })

    // const token=user.getJWTToken();
    // res.status(200).json({success:true,user,"Token":token})

    sendToken(user, 201, res);
})




/*******************************************************************LOGIN ************************************************ */
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }


    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400))

    }
    // console.log(user);
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, 'error': "Please Enter correct Credentials" });
    }

    //     const data = {
    //      user:{
    //        id: user._id
    //      }
    //    }
    //    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    //     res.status(200).json({success:true,user,authToken})



    sendToken(user, 200, res);
});



/*************************************************LOGOUT USER ************************************************************************/

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(
            Date.now()
        ),
        httpOnly: true
    });

    res.status(200).json({ success: true, message: "Logged out Successfully" });
});



/*********************************************FORGOT PASSWORD ********************************************************************/


exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    //if user does not exist
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    //CALL FUNCTION FROM USER SCHEMA
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset link is \n\n  click to reset password \n ${resetPasswordUrl} \n\n If you have not requested this email then please igore it.`;




    try {

        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password recovery",
            message

        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });

    } catch (error) {
        //need to set these value to undefined cause values will be set to something
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})




/*****************************************************RESET PASSWORD *******************************************************/


exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });


    //if user does not exist
    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    //confirm password
    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Pasword does not match", 400));
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save();

    sendToken(user, 200, res);

})


/********************************************************************GET USER DETAILS********************************************************* */

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});


/********************************************************************UPDATE USER PASSWORD********************************************************* */

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');


    const passwordCompare = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!passwordCompare) {
        // success = false;
        // return res.status(400).json({ success, 'error': "old Password is Incorrect" });

        return next(new ErrorHandler("old password is Incorrect", 400));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
        // success = false;
        // return res.status(400).json({ success, 'error': "Password does not match" });
        return next(new ErrorHandler("Pasword does not match", 400));
    }


    user.password = req.body.newPassword;
    await user.save();
    // res.status(200).json({
    //     success:true,
    //     user
    // })

    sendToken(user, 200, res);
});
/********************************************************************UPDATE USER Profile details********************************************************* */

exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })

});
/********************************************************************GET ALL USERS FROM DATABASE --ADMIN********************************************************* */
//admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {


    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

});
//single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {


    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })

});



/********************************************************************UPDATE USER Profile--- ADMIN********************************************************* */
//Admin--role
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        // name: req.body.name,
        // email: req.body.email,
        role: req.body.role,
    };
      
///can add check if user exist or not *******************************************************************///////
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })

});


/********************************************************************UPDATE USER--- ADMIN********************************************************* */
// ADMIN-DELETE
exports.deleteProfile = catchAsyncError(async (req, res, next) => {


    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
    }

    await user.remove();
    res.status(200).json({
        success: true,
        message: "Account deleted successfully"
    })

});





