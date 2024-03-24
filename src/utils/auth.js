// require('dotenv').config();
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const { _id, role } = user || {};

  return jwt.sign({ _id, role }, config.secret, {
    expiresIn: '1h'
  });
};

const verifyToken = (token) => {
  if (!token) {
    return {};
  }

  const decoded = jwt.verify(token, config.secret);

  return decoded;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  checkPassword
};
