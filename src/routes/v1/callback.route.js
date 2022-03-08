const express = require('express');
const validate = require('../../middlewares/validate');
const callbackController = require('../../controllers/callback.controller');
// const paymentValidation = require('../../validations/payment.validation');

const router = express.Router();

router
    .route('/')
    .post(callbackController.callbackNotification)

module.exports = router;
