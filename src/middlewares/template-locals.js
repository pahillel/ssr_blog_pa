const setTemplateLocals = (req, res, next) => {
  const { role = '', _id } = req.user || {};

  res.locals = {
    isAuth: !!_id,
    isAdmin: role === 'admin',
    user: _id
  };

  next();
};

module.exports = setTemplateLocals;
