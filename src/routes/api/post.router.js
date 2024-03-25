const router = require('express').Router();
const postController = require('../../controllers/post.controller');

const { isAuth } = require('../../middlewares/guards');

// get all posts (for index)
router.get('/', (req, res) => {});

// // get current post
// router.get('/:postId');

// get user posts (for home page)
router.get('/user/:userId', isAuth, postController.getMyPosts);

// create post auth
router.post('/', isAuth, postController.createNewPost);

// // delete post auth
// router.delete('/:postId');

module.exports = router;
