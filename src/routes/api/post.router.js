const router = require('express').Router();
const postController = require('../../controllers/post.controller');

const { isAuth } = require('../../middlewares/guards');

router.get('/', postController.getAllPosts);

router.get('/user/:userId', isAuth, postController.getMyPosts);

router.post('/', isAuth, postController.createNewPost);

router.get('/:postId', postController.getPost);

router.delete('/:postId', isAuth, postController.deletePost);

module.exports = router;
