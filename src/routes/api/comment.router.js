const router = require('express').Router();
const commentController = require('../../controllers/comment.controller');
const { isAuthApi } = require('../../middlewares/guards');
const validate = require('../../middlewares/validate');
const {
  createCommentValidation,
  deleteCommentValidation
} = require('../../validations/comment.validation');

router.post(
  '/:postId',
  isAuthApi,
  validate(createCommentValidation),
  commentController.createComment
);

router.delete(
  '/:commentId',
  isAuthApi,
  validate(deleteCommentValidation),
  commentController.deleteComment
);

module.exports = router;
