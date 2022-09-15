const express = require('express');
const { readTalkerFile } = require('../utils/readAndWriteFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  try {
    const talkers = await readTalkerFile();
    res.status(200).json(talkers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = talkerRouter;