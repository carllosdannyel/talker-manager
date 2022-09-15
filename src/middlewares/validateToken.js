const validateToken = (req, res, next) => {
  const authorization = req.header('authorization');

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = validateToken;