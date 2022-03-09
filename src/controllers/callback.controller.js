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
        let retailName = isVa ? 'null' : req.body.retail_outlet_name
        let name = req.body.external_id;

        var formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

        let amount = formatter.format(unformattedAmount); /* $2,500.00 */

        if (req.body.transaction_timestamp) {
            const payload = {
                'title': `Pembayaran ${name} diterima!`,
                'body': `Pembayaran senilai ${amount} dengan ${isVa ? `menggunakan virtual account ${bankCode}` : `menggunakan ${retailName}`} berhasil`,
                'amount': amount,
                'paymentType': isVa? `Virtual Account ${bankCode}` : `Pembayaran dengan ${retailName}`,
                'date': req.body.transaction_timestamp
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
