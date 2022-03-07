const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createVaPayment = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        bankCode: Joi.string().required().valid('BCA', 'BNI', 'MANDIRI', 'PERMATA', 'SAHABAT_SAMPOERNA', 'BRI', 'CIMB', 'BSI', 'BJB', 'DBS'),
        name: Joi.string().required(),
        amount: Joi.number().required(),
    }),
};

const createRetailPayment = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        outlet: Joi.string().required().valid('ALFAMART', 'INDOMARET'),
        name: Joi.string().required(),
        amount: Joi.number().required(),
    }),
};

const getVirtualAccount = {
    params: Joi.object().keys({
        vaId: Joi.string().required(),
    }),
};

const getRetail = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

module.exports = {
    createVaPayment,
    createRetailPayment,
    getVirtualAccount,
    getRetail,
};
