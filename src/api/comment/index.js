const router = require('express').Router();
const { isAuth } = require('../../guards');
const commentController = require('./comment.controller');

router.post('/', isAuth, commentController.createComment);

router.delete('/:commentId', isAuth, commentController.deleteComment);

module.exports = router;
