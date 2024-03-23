require('dotenv').config();
const config = require('config');
const { celebrate, isCelebrateError } = require('celebrate');

const { verifyToken, signToken } = require('../utils/auth');

const validate = (
  schema,
  options = {
    abortEarly: false,
    stripUnknown: {
      objects: true
    }
  },
  celebrateOptions = {}
) => {
  return (req, res, next) => {
    celebrate(schema, options, celebrateOptions)(req, res, (err) => {
      if (err && isCelebrateError(err)) {
        const error = Array.from(err.details.entries()).map(([key, detail]) => {
          const details = detail.details.reduce((acc, item) => {
            acc[item.context.key] = item.message;
            return acc;
          }, {});

          return {
            message: 'Validation error',
            body: details
          };
        });

        return res.status(400).json({ error });
      }
      next();
    });
  };
};

const checkAuth = (req, res, next) => {
  const { token } = req.cookies;

  console.log('checkAuth', token);

  if (token) {
    try {
      const decodedToken = verifyToken(token);

      console.log('decodedToken', decodedToken);

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
  const { _id, role } = req.session.user || {};

  console.log(req.session);
  console.log('tokenSession', _id);

  if (!_id) {
    // return next('Auth error');
  }

  const token = signToken({ _id, role });

  res.cookie('token', token, config.cookies);

  return res.redirect('/');
};

module.exports = {
  checkAuth,
  tokenSession,
  validate
};
