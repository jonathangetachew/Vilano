const firebase = require('firebase-admin');

const config = require('./serviceAccountKey');

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: process.env.DATABASE_URL,
});

module.exports = firebase;
