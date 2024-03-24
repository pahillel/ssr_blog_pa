const isAdmin = (req, res, next) => {
  const { role } = req.user || {};

  if (role !== 'admin') {
    return res.status(403).send('Forbidden');
  }

  return next();
};

const isAuth = (req, res, next) => {
  console.log('isAuth url:', req.url, 'cookies:', req.cookies.token);

  const { token } = req.cookies;
  if (!token) {
    // res.status(401).send('Unauthorized');
    // throw new Error('Unauthorized');
  }

  return next();
};

module.exports = {
  isAdmin,
  isAuth
};
