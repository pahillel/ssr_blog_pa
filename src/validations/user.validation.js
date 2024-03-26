const Joi = require('joi');
const { baseString, requiredObjectId } = require('./common.validation');

const baseUser = baseString.min(4).max(64);

const createUserValidation = {
  body: {
    userName: baseUser.required(),
    email: baseUser.email().required(),
    password: baseUser.required()
  }
};

const loginUserValidation = {
  body: {
    userName: baseUser.required(),
    password: baseUser.required()
  }
};

const deleteUsersValidation = {
  params: {
    userId: requiredObjectId
  }
};

module.exports = {
  createUserValidation,
  loginUserValidation,
  deleteUsersValidation
};
