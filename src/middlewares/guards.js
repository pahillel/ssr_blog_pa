const isAdmin = (req, res, next) => {
  const { role } = req.user || {};

  if (role !== 'admin') {
    throw new Error('Forbidden');
  }

  next();
};

module.exports = {
  isAdmin
};
