const Joi = require('joi');

const createPostValidation = {
  body: {
    text: Joi.string().trim().required()
  }
};

const deletePostValidation = {
  params: {
    postId: Joi.string().trim().required()
  }
};

module.exports = {
  createPostValidation,
  deletePostValidation
};
