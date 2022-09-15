const validateWatchedAt = (req, res, next) => {
  const regexToDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  const { talk: { watchedAt } } = req.body;
  const verifyFormatDate = regexToDate.test(watchedAt);

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (!verifyFormatDate) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = validateWatchedAt;