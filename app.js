const express = require('express');
const bodyParser = require('body-parser');

const dataRoutes = require('./routes/data');

const app = express();
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/data', dataRoutes);

module.exports = app;
