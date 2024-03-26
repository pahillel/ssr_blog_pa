const router = require('express').Router();
const userRouter = require('./user.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');

const { errorHandlerApi, notFoundApi } = require('../../middlewares/global');

router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

router.use(errorHandlerApi);
router.use(notFoundApi);

module.exports = router;
