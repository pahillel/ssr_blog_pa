const config = require('config');
const { generateToken, verifyToken } = require('../utils/auth');

const isAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Error('Forbidden');
  }

  next();
};

const jwtParser = (req, res, next) => {
  const { token = '' } = req.cookies;
  const user = verifyToken(token);

  req.user = user;

  next();
};

const saveSession = (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      next(err);
    }

    next();
  });
};

const tokenSession = (req, res) => {
  const { _id, role } = req.user || {};

  if (!_id || !role) {
    return res.redirect('/');
  }

  const token = generateToken({ _id, role });

  res.cookie('token', token, { ...config.cookies, secure: true });

  return res.redirect('/');
};

module.exports = {
  isAuth,
  tokenSession,
  jwtParser,
  saveSession
};
