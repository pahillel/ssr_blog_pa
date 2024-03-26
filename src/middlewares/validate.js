const { celebrate, isCelebrateError } = require('celebrate');

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

        return res.status(400).json({ validation_error: error });
      }

      next();
    });
  };
};

module.exports = validate;
