const router = require('express').Router();
const postController = require('./post.controller');

const { isAuth } = require('../../guards');

router.post('/', postController.createPost);

router.get('/:postId', postController.getPost);

router.get('/', postController.getAllPosts);

router.delete('/:postId', isAuth, postController.deletePost);

module.exports = router;
