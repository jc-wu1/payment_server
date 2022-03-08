const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const sendNotification = require('../services/firebase.service');

const callbackNotification = catchAsync(async (req, res) => {
    if (req.headers["x-callback-token"] == config.xendit_callback_token) {
        // console.log(req.body);
        let amount = req.body.amount;
        let isVa = req.body.callback_virtual_account_id ? true : false;
        let bankCode = isVa ? req.body.bank_code : 'null';
        let name = req.body.external_id;

        if (req.body) {
            const payload = {
                'title': `Pembayaran ${name} diterima!`,
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
