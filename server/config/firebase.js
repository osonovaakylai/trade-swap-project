const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyD1ygCOm0MPyIyqgAQBYrbSPZq7CFwU-YI",
    authDomain: "tradekg-2621a.firebaseapp.com",
    databaseURL: "https://tradekg-2621a.firebaseio.com",
    projectId: "tradekg-2621a",
    storageBucket: "tradekg-2621a.appspot.com",
    messagingSenderId: "148348868294"
};

firebase.initializeApp(config);

module.exports = firebase;