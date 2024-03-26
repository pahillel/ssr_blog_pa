const router = require('express').Router();
const commentController = require('../../controllers/comment.controller');
const { isAuthApi } = require('../../middlewares/guards');

router.post('/:postId', isAuthApi, commentController.createComment);

router.delete('/:commentId', isAuthApi, commentController.deleteComment);

module.exports = router;
