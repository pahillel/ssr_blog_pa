const isAuth = (req, res, next) => {
  if (!req.user) {
    throw new Error('Unauthorized');
  }

  next();
};

const isAdmin = (req, res, next) => {
  const { role = '' } = req.user || {};

  if (role !== 'admin') {
    throw new Error('Forbidden! You have no permission');
  }

  next();
};

module.exports = {
  isAuth,
  isAdmin
};
