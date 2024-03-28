const Joi = require('joi');
const { requiredObjectId } = require('./common.validation');

const createCommentValidation = {
  params: {
    postId: requiredObjectId
  },
  body: {
    comment: Joi.string().trim().min(1).required()
  }
};

const deleteCommentValidation = {
  params: {
    commentId: requiredObjectId
  }
};

module.exports = {
  createCommentValidation,
  deleteCommentValidation
};
