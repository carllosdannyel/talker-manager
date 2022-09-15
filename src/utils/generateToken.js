// REFERÊNCIA: => https://www.delftstack.com/pt/howto/javascript/javascript-random-string/

const generateToken = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < num; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

module.exports = generateToken;
