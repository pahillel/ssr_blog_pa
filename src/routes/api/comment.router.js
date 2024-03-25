const router = require('express').Router();
const commentController = require('../../controllers/comment.controller');
const { isAuth } = require('../../middlewares/guards');

router.post('/:postId', isAuth, commentController.createComment);

router.delete('/:commentId', isAuth, commentController.deleteComment);

module.exports = router;
