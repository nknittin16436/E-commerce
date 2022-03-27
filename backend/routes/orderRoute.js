const express = require('express');
const Order = require("../models/orderModel");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder} = require('../controllers/orderController');
const { isUserAuthenticated, authorizeRoles} = require('../middleware/authentication');
const router = express.Router();

router.route("/order/new").post(isUserAuthenticated,newOrder);

router.route("/order/me").get(isUserAuthenticated,myOrders);

// router.route("/order/:id").get(isUserAuthenticated,authorizeRoles("admin"),getSingleOrder);

router.route("/order/:id").get(isUserAuthenticated,getSingleOrder);


router.route("/admin/orders").get(isUserAuthenticated,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isUserAuthenticated,authorizeRoles("admin"),updateOrder);
router.route("/admin/order/:id").delete(isUserAuthenticated,authorizeRoles("admin"),deleteOrder);



module.exports = router