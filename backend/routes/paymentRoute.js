const express = require('express');
const router = express.Router();
const { isUserAuthenticated } = require('../middleware/authentication');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');


router.route("/process/payment").post(isUserAuthenticated, processPayment);
router.route("/stripeapikey").get(isUserAuthenticated, sendStripeApiKey);
module.exports = router;