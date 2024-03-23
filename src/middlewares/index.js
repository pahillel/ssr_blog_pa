const { celebrate, isCelebrateError } = require('celebrate');
const { statusCodes } = require('../constants');

const validate = (
  schema,
  options = {
    abortEarly: false,
    stripUnknown: {
      objects: true
    }
  },
  celebrateOptions = {}
) => {
  return (req, res, next) => {
    celebrate(schema, options, celebrateOptions)(req, res, (err) => {
      if (err && isCelebrateError(err)) {
        const error = Array.from(err.details.entries()).map(([key, detail]) => {
          const details = detail.details.reduce((acc, item) => {
            acc[item.context.key] = item.message;

            return acc;
          }, {});

          return {
            message: 'Validation error',
            body: details
          };
        });

        return res.status(statusCodes.BAD_REQUEST).json({ error });
      }

      next();
    });
  };
};

const isAuth = (req, res) => {
  const x = req.headers;

  console.log(x);

  return true;
};

module.exports = {
  validate,
  isAuth
};
