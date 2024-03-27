const { verifyToken } = require('../utils/auth');

const tokenParser = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = verifyToken(token);

      req.user = decoded;
    } catch (error) {
      res.clearCookie('token');
    }
  }

  next();
};

module.exports = tokenParser;
