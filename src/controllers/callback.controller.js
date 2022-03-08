const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const sendNotification = require('../services/firebase.service');

const callbackNotification = catchAsync(async (req, res) => {
    if (req.headers["x-callback-token"] == config.xendit_callback_token) {
        // console.log(req.body);
        let unformattedAmount = req.body.amount;
        let isVa = req.body.callback_virtual_account_id ? true : false;
        let bankCode = isVa ? req.body.bank_code : 'null';
        let name = req.body.external_id;

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        let amount = formatter.format(unformattedAmount); /* $2,500.00 */


        if (req.body) {
            const payload = {
                'title': `Pembayaran ${name} diterima!`,
                'body': `Pembayaran senilai ${amount} dengan ${isVa ? `menggunakan virtual account ${bankCode}` : 'menggunakan retail'} berhasil`
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
