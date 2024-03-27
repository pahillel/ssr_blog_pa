const { statusCode, errorMessages } = require('../constants');

const errorHandlerApi = (err, req, res, next) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR).json({
    error: err.message || errorMessages.INTERNAL_SERVER_ERROR
  });
};

const notFoundApi = (req, res, next) => {
  res.status(statusCode.NOT_FOUND).json({ error: errorMessages.NOT_FOUND });
};

const errorHandler = (err, req, res, next) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR).render('error', {
    error: err.message || errorMessages.INTERNAL_SERVER_ERROR,
    useAssets: 'error'
  });
};

const notFound = (req, res, next) => {
  res.status(statusCode.NOT_FOUND).render('404', { useAssets: '404' });
};

module.exports = {
  errorHandlerApi,
  errorHandler,
  notFoundApi,
  notFound
};
