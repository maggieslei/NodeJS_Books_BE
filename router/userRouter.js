const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const { findUser, createUser } = require('../db/db');

router.post('/register', async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await findUser({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User exist, try logging in' });
  }

  try {
    const user = {};
    Object.assign(user, req.body);
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return res.status(501).json({ message: 'Error ' + err.message });
      }
      user.password = hash;
    });
    user._id = new mongoose.Types.ObjectId();
    const dbUser = await createUser(user);
    res.status(201).json({ message: 'Successful Registration', user: dbUser });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
