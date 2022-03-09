const firebase = require('firebase-admin');
const privateKey = require('../../private-key.json')

firebase.initializeApp({
    credential: firebase.credential.cert(privateKey),
});

// const firebaseToken = '';

const sendNotification = (notificationPayload) => {
    const topicName = 'payment';
    const message = {
        notification: {
            title: notificationPayload.title,
            body: notificationPayload.body
        },
        // android: {
        //     notification: {
        //         icon: 'stock_ticker_update',
        //         color: '#7e55c3',
        //         clickAction: 'choose-payment-method'
        //     }
        // },
        topic: topicName,
    };
    firebase.messaging().send(message).then((response) => {
        console.log(response + ' messages were sent successfully');
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
};

module.exports = sendNotification;