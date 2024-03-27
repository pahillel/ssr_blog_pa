const { celebrate, isCelebrateError } = require('celebrate');
const { statusCode } = require('../constants');

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
        const error = Array.from(err.details.entries()).map(
          ([key, detail]) => `Validation error (${key}): ${detail.message}`
        );

        return res
          .status(statusCode.BAD_REQUEST)
          .json({ error, type: 'validation-error' });
      }

      next();
    });
  };
};

module.exports = validate;
