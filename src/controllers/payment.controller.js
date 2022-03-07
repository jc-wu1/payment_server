const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const getVaBanks = catchAsync(async (req, res) => {
    const vaBanks = await paymentService.getVaBanks();
    res.status(httpStatus.OK).send(vaBanks);
});

const createVaPayment = catchAsync(async (req, res) => {
    const vaPayment = await paymentService.createVaPayment(req.body);
    res.status(httpStatus.CREATED).send(vaPayment);
});

const createRetailPayment = catchAsync(async (req, res) => {
    const retailPayment = await paymentService.createRetailPayment(req.body);
    res.status(httpStatus.CREATED).send(retailPayment);
});

const getVirtualAccount = catchAsync(async (req, res) => {
    const va = await paymentService.getVirtualAccount(req.params.vaId);
    if (!va) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    res.send(va);
});

const getRetail = catchAsync(async (req, res) => {
    const retail = await paymentService.getRetail(req.params.id);
    if (!retail) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
    }
    res.send(retail);
});

module.exports = {
    getVaBanks,
    createVaPayment,
    createRetailPayment,
    getVirtualAccount,
    getRetail,
};
