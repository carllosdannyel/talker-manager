const express = require('express');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validadeAge = require('../middlewares/validateAge');
const validadeTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validadeRate = require('../middlewares/validadeRate');
const {
  readTalkerFile,
  findTalkerById,
  insertTalker,
  editTalker,
  deleteTalker,
} = require('../utils/readAndWriteFile');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  try {
    const talkers = await readTalkerFile();
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
});

talkerRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const talker = await deleteTalker(+id);
    return res.status(204).json(talker);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

talkerRouter.use(
  validateToken,
  validateName,
  validadeAge,
  validadeTalk,
  validateWatchedAt,
  validadeRate,
);

talkerRouter.post('/', async (req, res) => {
  const arrayTalkers = await readTalkerFile();
  const talker = req.body;
  const newTalker = {
    id: arrayTalkers[arrayTalkers.length - 1].id + 1,
    ...talker,
  };

  try {
    await insertTalker(newTalker);
    return res.status(201).json(newTalker);
  } catch (error) {
    return res.status(500).json({ menssage: error.message });
  }
});

talkerRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = req.body;
  
  try {
    const newTalker = await editTalker(talker, +id);
    return res.status(200).json(newTalker);
  } catch (error) {
    return res.status(500).json({ menssage: error.message });
  }
});

module.exports = talkerRouter;