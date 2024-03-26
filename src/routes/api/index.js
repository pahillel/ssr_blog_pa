const router = require('express').Router();
const userRouter = require('./user.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

module.exports = router;
