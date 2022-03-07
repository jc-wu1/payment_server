const express = require('express');
const validate = require('../../middlewares/validate');
const paymentController = require('../../controllers/payment.controller');
const paymentValidation = require('../../validations/payment.validation');

const router = express.Router();

router
    .route('/va-banks')
    .get(paymentController.getVaBanks)

router
    .route('/create_va_payment')
    .post(validate(paymentValidation.createVaPayment), paymentController.createVaPayment)

router
    .route('/create_retail_payment')
    .post(validate(paymentValidation.createRetailPayment), paymentController.createRetailPayment)

router
    .route('/va/:vaId')
    .get(validate(paymentValidation.getVirtualAccount), paymentController.getVirtualAccount)

router
    .route('/retail/:id')
    .get(validate(paymentValidation.getRetail), paymentController.getRetail)

module.exports = router;
