const express = require('express');
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, (_req, res) => {
  try {
    const token = generateToken(16);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ menssage: error.message });
  }
});

module.exports = loginRouter;