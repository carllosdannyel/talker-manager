const validateEmail = (req, res, next) => {
  const regexToEmail = /\S+@\S+\.\S+/;
  const { email } = req.body;
  const testEmail = regexToEmail.test(email);

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!testEmail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

module.exports = validateEmail;
