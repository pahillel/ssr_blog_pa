const Joi = require('joi');

const createUserValidation = {
  body: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
};

module.exports = {
  createUserValidation
};
