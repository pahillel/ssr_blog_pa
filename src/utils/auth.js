const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signToken = (payload) => {
  return jwt.sign(payload, config.secret, {
    expiresIn: '1d'
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.secret);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);

  return !!result;
};

module.exports = {
  signToken,
  verifyToken,
  hashPassword,
  comparePassword
};
