require('dotenv').config();
const config = require('config');

const { verifyToken, signToken } = require('../utils/auth');

const checkAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decodedToken = verifyToken(token);

      req.user = decodedToken.userId;

      next();
    } catch (error) {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};

const tokenSession = (req, res, next) => {
  const { _id, role } = req.user || {};

  if (!_id || !role) {
    return next('Auth error');
  }

  const token = signToken({ _id, role });

  res.cookie('token', token, config.cookies);

  return res.redirect('/');
};

module.exports = {
  checkAuth,
  tokenSession
};
