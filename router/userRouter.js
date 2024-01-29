const express = require('express');
const router = express.Router();
const userServices = require('../services/userService');

router.post('/register', userServices.registerUser);

router.post('/login', userServices.loginUser);

module.exports = router;
