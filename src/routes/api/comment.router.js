const router = require('express').Router();
const commentController = require('../../controllers/comment.controller');
const { isAuthApi } = require('../../middlewares/guards');
const validate = require('../../middlewares/validate');
const {
  createPostValidation,
  deletePostValidation
} = require('../../validations/comment.validation');

router.post(
  '/:postId',
  isAuthApi,
  validate(createPostValidation),
  commentController.createComment
);

router.delete(
  '/:commentId',
  isAuthApi,
  validate(deletePostValidation),
  commentController.deleteComment
);

module.exports = router;
