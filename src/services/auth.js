const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);

  return result;
};

const comparePasswords = async (password, hash) => {
  try {
    console.log(password, hash);
    const check = await bcrypt.compare(password, hash);

    return !!check;
  } catch (error) {
    return false;
  }
};

const signJwt = (payload) => {
  return jwt.sign(payload, config.secret, { expiresIn: '1h' });
};

const verifyJwt = (token) => {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, config.secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
  signJwt,
  verifyJwt
};
