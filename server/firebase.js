const firebase = require('firebase-admin');

const { getDecryptedSecret } = require('./Decrypt');

firebase.initializeApp({
  credential: firebase.credential.cert(getDecryptedSecret()),
  databaseURL: process.env.DATABASE_URL,
});

module.exports = firebase;
