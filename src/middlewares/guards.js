const isAuthApi = (req, res, next) => {
  if (!req.user) {
    next(new Error('Unauthorized'));
  }

  next();
};

const isAdminApi = (req, res, next) => {
  const { role = '' } = req.user || {};

  if (role !== 'admin') {
    next(new Error('Forbidden! You have no permission'));
  }

  next();
};

const isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  next();
};

const isAdmin = (req, res, next) => {
  const { role = '' } = req.user || {};

  if (role !== 'admin') {
    return res.redirect('/home');
  }

  next();
};

const isAnonymous = (req, res, next) => {
  if (req.user) {
    return res.redirect('/posts');
  }

  next();
};

module.exports = {
  isAuthApi,
  isAdminApi,
  isAuth,
  isAdmin,
  isAnonymous
};
