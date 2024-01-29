require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const { findUser, createUser } = require('../db/db');

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await findUser({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User exist, try logging in' });
    }

    const user = {};
    Object.assign(user, req.body);
    const hash = await bcrypt.hash(user.password, 10);
    if (!hash) {
      return res.status(501).json({ message: 'Error ' + err.message });
    }
    user.password = hash;
    user._id = new mongoose.Types.ObjectId();
    const dbUser = await createUser(user);
    const resUser = _.omit(dbUser.toObject(), 'password');
    res.status(201).json({ message: 'Successful Registration', user: resUser });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let loggedUser = await findUser({ email });
    if (!loggedUser) {
      throw new Error('Authentication Failed: Unable to find user');
    }
    const comparePass = await bcrypt.compare(password, loggedUser.password);
    if (!comparePass) {
      throw new Error('Authentication Failed: Invalid Password');
    }
    const resUser = _.omit(loggedUser.toObject(), 'password');
    const token = jwt.sign({ user: resUser }, process.env.jwt_secret);
    res.status(201).json({
      user: resUser,
      logged: true,
      token,
      message: 'Login Successful',
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
