const config = require('config');
const { verifyToken, generateToken } = require('./utils/helpers');
const axios = require('axios');

// const instance = axios.create({
//   // baseURL: `${config.baseUrl}/api`
// });

// const setTokenInAxios = (token) => {
//   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

const jwtParser = (req, res, next) => {
  const { token = '' } = req.cookies;
  console.log('jwtParser url=', req.url, 'token=', token);

  const user = verifyToken(token);
  // setTokenInAxios(token);

  // console.log('JWT PARSER MW', req.url, user);
  req.user = user;

  next();
};

const apiSession = (req, res, next) => {
  const { _id, role } = req.user || {};

  if (!_id || !role) {
    return res.status(401).send('Unauthorized');
  }

  const token = generateToken({ _id, role });

  console.log('API SESSION MW', token);

  res.cookie('token', token, { ...config.cookies, secure: true });

  console.log('[HERE]', res.cookies);

  // return res.status(200).json(token);
  next();
};

const publicSession = (req, res) => {
  const { _id, role } = req.user || {};

  console.log('PUBLIC SESSION MW', req.url, req.user, _id, role);

  if (!_id || !role) {
    return res.redirect('/');
  }

  const token = generateToken({ _id, role });

  res.cookie('token', token, { ...config.cookies, secure: true });

  return res.redirect('/');
};

const saveSession = (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      next(err);
    }

    next();
  });
};

const templateLocals = (req, res, next) => {
  const { role = '' } = req.user || {};
  const { token = '' } = req.cookies;

  res.locals = {
    isAuth: !!token,
    isAdmin: role === 'admin'
  };

  next();
};

module.exports = {
  jwtParser,
  publicSession,
  apiSession,
  saveSession,
  templateLocals
};
