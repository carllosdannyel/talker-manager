const fs = require('fs/promises');
const { join } = require('path');

const talker = '../talker.json';

const readTalkerFile = async () => {
  const contentFile = await fs.readFile(join(__dirname, talker), 'utf-8');
  return JSON.parse(contentFile);
};

module.exports = {
  readTalkerFile,
};