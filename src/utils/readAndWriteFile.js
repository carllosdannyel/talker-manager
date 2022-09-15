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

const editTalker = async (talkerInfo, id) => {
  const contentFile = await readTalkerFile();
  let updateTalker;

  contentFile.forEach((_talker, index) => {
    if (contentFile[index].id === id) {
      contentFile[index].name = talkerInfo.name;
      contentFile[index].age = talkerInfo.age;
      contentFile[index].talk.watchedAt = talkerInfo.talk.watchedAt;
      contentFile[index].talk.rate = talkerInfo.talk.rate;
      updateTalker = contentFile[index];
    }
  });

  await fs.writeFile(join(__dirname, talker), JSON.stringify(contentFile));
  return updateTalker;
};

module.exports = {
  readTalkerFile,
  findTalkerById,
  insertTalker,
  editTalker,
};