const router = require('express').Router();
const postController = require('../../controllers/post.controller');

const { isAuthApi } = require('../../middlewares/guards');

router.get('/', postController.getAllPosts);

router.get('/user/:userId', isAuthApi, postController.getMyPosts);

router.post('/', isAuthApi, postController.createNewPost);

router.get('/:postId', postController.getPost);

router.delete('/:postId', isAuthApi, postController.deletePost);

module.exports = router;
