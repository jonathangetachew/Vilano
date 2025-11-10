require('custom-env').env(true);

const express = require('express');
const cors = require('cors');
const hashes = require('jshashes');
// const db = require('./db');

const allowedUrls = ['http://localhost:8080', 'https://vilano.vercel.app'];

const app = express();
const port = 3000;
const hash = new hashes.SHA512();
const corsOptions = {
  origin: allowedUrls,
  optionsSuccessStatus: 200, // for legacy browser support
};

function generatePassword(main, service) {
  const val = {};

  // Append main password to the service name for generating
  // password based on the main password
  val.service = service;
  val.password = hash.b64(main + service).slice(0, 20);

  return val;
}

async function getServices() {
  const services = [
    'Apple',
    'PayPal',
    'LinkenIn',
    'Yahoo',
    'Amazon',
    'Instagram',
    'Snapchat',
    'Twitter',
    'Facebook',
    'Microsoft',
    'Google'
  ];

  // await db
  //   .collection('services')
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       services.push(doc.data().service);
  //     });
  //   });

  return services;
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: `Hello: I'm working -> ${hash.b64('Hello')}` });
});

// Generate password for available services based on a main password
app.get('/pass', async (req, res) => {
  const { main } = req.query;
  const services = await getServices();
  const response = [];

  services
    .sort()
    .map((service) => response.push(generatePassword(main, service)));

  res.json(response);
});

app.get('/pass/custom', (req, res) => {
  const { main, service: customService } = req.query;
  const response = [];

  response.push(generatePassword(main, customService));

  res.json(response);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on http:localhost:${port}`);
});
