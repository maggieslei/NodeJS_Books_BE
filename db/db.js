require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log(`connected to DB`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
