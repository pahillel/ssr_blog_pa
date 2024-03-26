const Joi = require('joi');
const { requiredObjectId } = require('./common.validation');

const createPostValidation = {
  params: {
    postId: requiredObjectId
  },
  body: {
    comment: Joi.string().trim().min(1).required()
  }
};

const deletePostValidation = {
  params: {
    postId: requiredObjectId
  }
};

module.exports = {
  createPostValidation,
  deletePostValidation
};
