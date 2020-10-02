const express = require('express');
const cors = require('cors');
const hashes = require('jshashes');
const fs = require('fs');

const app = express();
const port = 3000;
const hash = new hashes.SHA512();
const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200, // for legacy browser support
};

function generatePassword(master, service) {
  const val = {};

  // Append master password to the service name for generating
  // password based on the master
  val['service'] = service;
  val['password'] = hash.b64(master + service).slice(0, 20);

  return val;
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: `Hello: I'm working -> ${hash.b64('Hello')}` });
});

// Generate password for available services based on a master password
app.get('/pass', (req, res) => {
  const master = req.query.master;
  const services = fs.readFileSync('services.txt').toString().split('\r\n');
  const response = [];

  services.map((service) => {
    response.push(generatePassword(master, service));
  });

  res.json(response);
});

app.get('/pass/custom', (req, res) => {
  const master = req.query.master;
  const customService = req.query.service;
  const response = [];

  response.push(generatePassword(master, customService));

  res.json(response);
});

app.listen(port, () => {
  console.log(`App running on http:localhost:${port}`);
});
