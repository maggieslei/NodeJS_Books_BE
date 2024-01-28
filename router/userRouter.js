const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const userServices = require('../services/userService');

const { findUser, createUser } = require('../db/db');

router.post('/register', userServices.registerUser);

router.post('/login', userServices.loginUser);

module.exports = router;
