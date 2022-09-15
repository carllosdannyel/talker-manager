const express = require('express');
const { readTalkerFile, findTalkerById } = require('../utils/readAndWriteFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  try {
    const talkers = await readTalkerFile();
    res.status(200).json(talkers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await findTalkerById(+id);
    if (!talker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(200).json(talker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = talkerRouter;