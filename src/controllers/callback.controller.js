const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const sendNotification = require('../services/firebase.service');

const callbackNotification = catchAsync(async (req, res) => {
    if (req.headers["x-callback-token"] == config.xendit_callback_token) {
        // const firebaseToken = '';
        if (req.body.bank_code) {
            const payload = {
                'title': 'Test',
                'body': 'Test'
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
