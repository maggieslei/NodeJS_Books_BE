const cors = require('cors');

const userRouter = require('../router/userRouter');
const bookRouter = require('../router/bookRouter');
const { connect } = require('../db/db');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// health point or actuator
// http://localhost:3001
app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Service is up' });
});

app.use('/users', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status,
      message: error.message,
    },
  });
});

connect();

module.exports = app;
