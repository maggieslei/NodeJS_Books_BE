const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Authorization, Origin, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
  }

  next();
});

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Service is up' });
});

module.exports = app;
