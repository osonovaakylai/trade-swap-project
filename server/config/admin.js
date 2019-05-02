const admin = require('firebase-admin');
const serviceAccountKey = require('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://tradekg-2621a.firebaseio.com"
})

module.exports = admin;