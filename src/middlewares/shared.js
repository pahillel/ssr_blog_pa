const setTemplateParams = (req, res, next) => {
  const { role = '' } = req.user || {};
  const { token = '' } = req.cookies;

  res.locals = {
    isAuth: !!token,
    isAdmin: role === 'admin'
  };

  next();
};

module.exports = {
  setTemplateParams
};
