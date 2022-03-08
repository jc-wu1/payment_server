const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const sendNotification = require('../services/firebase.service');

const callbackNotification = catchAsync(async (req, res) => {
    if (req.headers["x-callback-token"] == config.xendit_callback_token) {
        // const firebaseToken = '';
        let data = req.body.data;
        let paymentMethod = data.payment_method;
        let isVa = paymentMethod.virtual_account ? true : false;
        let amount = data.amount;

        if (req.body.status === 'SUCCEEDED') {
            const payload = {
                'title': 'Payment Complete',
                'body': `Pembayaran senilai ${amount} dengan ${isVa ? 'menggunakan virtual account' : 'menggunakan retail'} berhasil`
            }
            sendNotification(payload);
        }
        res.status(httpStatus.OK).json(req.body);
    } else {
        res.status(httpStatus.FORBIDDEN).json({ response: "Forbidden" });
    }
});


module.exports = {
    callbackNotification,
};
