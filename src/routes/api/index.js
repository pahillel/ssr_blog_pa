const router = require('express').Router();
const userRouter = require('./user.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');

// auth
router.use('/posts', postRouter);
// auth and admin
router.use('/users', userRouter);

// // auth
// router.use('/comments', commentRouter);

module.exports = router;
