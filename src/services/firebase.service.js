const firebase = require('firebase-admin');
const privateKey = require('../../private-key.json')

firebase.initializeApp({
    credential: firebase.credential.cert(privateKey),
});

// const firebaseToken = '';

const sendNotification = (notificationPayload) => {
    const topicName = 'payment';
    const message = {
        "notification": {
            "title": 'test',
            "body": 'test'
        },
        "android": {
            "notification": {
                clickAction: 'news_intent'
            }
        },
        topic: topicName,
    };
    firebase.messaging().sendAll(message).then((response) => {
        console.log(response + ' messages were sent successfully');
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
};

module.exports = sendNotification;