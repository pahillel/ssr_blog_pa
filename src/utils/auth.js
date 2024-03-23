require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');

const signToken = (userId) => {
  return jwt.sign(userId, config.secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  console.log('verifyToken', token);

  let data = {};

  if (!token) {
    return data;
  }

  try {
    data = jwt.verify(token, config.secret);
  } catch (error) {
    console.error(error);
  }

  return data;
};

module.exports = {
  signToken,
  verifyToken
};
