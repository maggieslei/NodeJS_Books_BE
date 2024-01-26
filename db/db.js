require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log(`connected to DB`);
  } catch (error) {
    console.log(error);
  }
};

const disconnect = async () => {
  await mongoose.connection.close();
};

const findUser = async (userObj) => {
  await User.findOne(userObj);
};

const createUser = async (newUserObj) => {
  await User.create(newUserObj);
};

module.exports = {
  connect,
  disconnect,
  findUser,
  createUser,
};
