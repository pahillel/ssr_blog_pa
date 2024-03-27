const router = require('express').Router();

const commentController = require('../../controllers/comment.controller');
const { isAuthApi } = require('../../middlewares/guards');
const validate = require('../../middlewares/validate');
const {
  createCommentValidation,
  deleteCommentValidation
} = require('../../validations/comment.validation');

/**
 * Route for creating a new comment.
 * @name POST /api/comments/:postId
 * @memberof module:commentRouter
 * @param {string} postId - The ID of the post to comment on.
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 */
router.post(
  '/:postId',
  isAuthApi,
  validate(createCommentValidation),
  commentController.createComment
);

/**
 * Route for deleting a comment.
 * @name DELETE /api/comments/:commentId
 * @memberof module:commentRouter
 * @param {string} commentId - The ID of the comment to delete.
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 */
router.delete(
  '/:commentId',
  isAuthApi,
  validate(deleteCommentValidation),
  commentController.deleteComment
);

module.exports = router;
