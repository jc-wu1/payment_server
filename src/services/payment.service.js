const Xendit = require('xendit-node');
const moment = require('moment');
const config = require('../config/config');

const x = new Xendit({
    secretKey: config.xendit_secret,
});

const { VirtualAcc, RetailOutlet } = x;
const vaSpecificOptions = {};
const retailOutletSpecificOptions = {};
const va = new VirtualAcc(vaSpecificOptions);
const ro = new RetailOutlet(retailOutletSpecificOptions);


const getVaBanks = async () => {
    const vaBanks = await va.getVABanks();
    return vaBanks;
};

const createVaPayment = async (paymentBody) => {
    const expiredDate = moment().add(3, 'hours');
    const resp = await va.createFixedVA({
        externalID: paymentBody.id,
        bankCode: paymentBody.bankCode,
        name: paymentBody.name,
        isClosed: true,
        expectedAmt: paymentBody.amount,
        expirationDate: expiredDate,
        isSingleUse: true,
    });
    return resp;
};

const createRetailPayment = async (paymentBody) => {
    const expiredDate = moment().add(3, 'hours');
    const resp = await ro.createFixedPaymentCode({
        externalID: paymentBody.id,
        retailOutletName: paymentBody.outlet,
        name: paymentBody.name,
        expectedAmt: paymentBody.amount,
        expirationDate: expiredDate,
        isSingleUse: true,
    });
    return resp;
};

const getVirtualAccount = async (vaId) => {
    // const expiredDate = moment().add(2, 'hours');
    const resp = await va.getFixedVA({
        id: vaId,
    });
    return resp;
};

const getRetail = async (id) => {
    // const expiredDate = moment().add(2, 'hours');
    const resp = await ro.getFixedPaymentCode({
        id: id,
    });
    return resp;
};


module.exports = {
    getVaBanks,
    createVaPayment,
    createRetailPayment,
    getVirtualAccount,
    getRetail,
};


// va.createFixedVA({
//     externalID: 'your-external-id',
//     bankCode: 'BCA',
//     name: 'Stanley Nguyen',
// })
//     .then(({ id }) => {
//         console.log(`Fixed VA created with ID: ${id}`);
//     })
//     .catch(e => {
//         console.error(`VA creation failed with message: ${e.message}`);
//     });