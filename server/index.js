const express = require('express');
const hashes = require('jshashes');
const fs = require('fs');

const app = express();
const port = 3000;
const hash = new hashes.SHA512();

app.get('/', (req, res) => {
  res.send(`Hello: I'm working -> ${hash.b64('Hello')}`);
});

// Generate password for available services based on a master password
app.get('/pass', (req, res) => {
  const master = req.query.master;
  const services = fs.readFileSync('services.txt').toString().split('\r\n');
  console.log(services);
  const response = [];
  services.map((service) => {
    const val = {};
    // Append master password to the service name for generating
    // password based on the master
    val[service] = hash.b64(master + service).slice(0, 20);
    response.push(val);
  });
  res.send(JSON.stringify(response));
});

app.listen(port, () => {
  console.log(`App running on http:localhost:${port}`);
});
