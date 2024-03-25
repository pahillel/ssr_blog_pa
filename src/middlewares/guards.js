const isAuth = (req, res, next) => {
  console.log('isAuth middleware', req.url);

  if (!req.user) {
    if (req.url === '/home') {
      return res.redirect('/login');
    } else {
      throw new Error('Unauthorized');
    }
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
