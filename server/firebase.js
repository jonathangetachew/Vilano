const firebase = require('firebase-admin');

const serviceAccountKey = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccountKey),
  databaseURL: process.env.DATABASE_URL,
});

module.exports = firebase;
