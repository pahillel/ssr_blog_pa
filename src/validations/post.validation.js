const Joi = require('joi');
const { requiredObjectId } = require('./common.validation');

const getUserPostsValidation = {
  params: {
    userId: requiredObjectId
  }
};

const getPostValidation = {
  params: {
    postId: requiredObjectId
  }
};

const createPostValidation = {
  body: {
    content: Joi.string().trim().min(1).required()
  }
};

module.exports = {
  getUserPostsValidation,
  getPostValidation,
  createPostValidation
};
