const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
dotenv.config({ path: 'backend/config/config.env' });



const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxlength: [30, "Name cannot exceed 30 character "],
        minlength: [3, "Name needs to be atleast 3 character "]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter correct email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password Should be minimum 8 characters"],
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


//FORGET PASSWORD LOGIC FOR REGENERATE TOKEN
UserSchema.methods.getResetPasswordToken = function () {

    //GENERATING TOKEN
    const resetToken = crypto.randomBytes(20).toString('hex');

    //HASHING AND ADDING resetPasswordToken to UserSchema

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex");


    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;


    return resetToken;
}



//EXPORT
const User = mongoose.model('user', UserSchema);
//   User.createIndexes();
module.exports = User