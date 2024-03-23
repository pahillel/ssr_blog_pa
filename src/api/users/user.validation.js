const Joi = require('joi');

const createUserValidation = {
  body: {
    userName: Joi.string().trim().lowercase().required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().trim().required()
  }
};

const loginUserValidation = {
  body: {
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().trim().required()
  }
};

module.exports = {
  createUserValidation,
  loginUserValidation
};
