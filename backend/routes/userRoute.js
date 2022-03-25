const express=require('express');
const { registerUser,loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteProfile } = require('../controllers/userController');
const { isUserAuthenticated, authorizeRoles } = require('../middleware/authentication');
const router=express.Router();


 

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isUserAuthenticated,getUserDetails);

router.route("/password/update").put(isUserAuthenticated,updatePassword);

router.route("/me/update").put(isUserAuthenticated,updateProfile);

router.route("/admin/users").get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);

router.route("/admin/user/:id").get(isUserAuthenticated, authorizeRoles("admin"), getSingleUser)
                               .put(isUserAuthenticated, authorizeRoles("admin"),updateUserRole)
                               .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProfile)


module.exports=router