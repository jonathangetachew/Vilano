const firebase = require('firebase-admin');

const serviceAccountKey = require('./serviceAccountKey');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccountKey),
  databaseURL: process.env.DATABASE_URL,
});

module.exports = firebase;
