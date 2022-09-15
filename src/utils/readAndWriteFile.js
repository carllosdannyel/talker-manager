const fs = require('fs/promises');
const { join } = require('path');

const talker = '../talker.json';

const readTalkerFile = async () => {
  const contentFile = await fs.readFile(join(__dirname, talker), 'utf-8');
  return JSON.parse(contentFile);
};

const findTalkerById = async (ID) => {
  const contentFile = await readTalkerFile();
  const response = contentFile.find(({ id }) => id === ID);
  return response;
};

const insertTalker = async (newTalker) => {
  const contentFile = await readTalkerFile();
  contentFile.push(newTalker);
  const response = await fs.writeFile(join(__dirname, talker), JSON.stringify(contentFile));
  return response;
};

module.exports = {
  readTalkerFile,
  findTalkerById,
  insertTalker,
};