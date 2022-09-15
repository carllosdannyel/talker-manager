const express = require('express');
const generateToken = require('../utils/generateToken');

const loginRouter = express.Router();

loginRouter.post('/', (_req, res) => {
  try {
    const token = generateToken(16);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = loginRouter;