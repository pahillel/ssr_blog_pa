const errorHandlerApi = (err, req, res, next) => {
  res.status(500).json({
    error: err.message || 'Something went wrong'
  });
};

const errorHandler = (err, req, res, next) => {
  res.status(500).render('error', {
    error: err.message || 'Something went wrong'
  });
};

const notFoundApi = (req, res, next) => {
  res.status(404).json({ error: 'Not found' });
};

const notFound = (req, res, next) => {
  res.status(404).render('404');
};

module.exports = {
  errorHandlerApi,
  errorHandler,
  notFoundApi,
  notFound
};
