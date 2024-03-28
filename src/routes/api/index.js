const router = require('express').Router();

const { errorHandlerApi, notFoundApi } = require('../../middlewares/global');
const userRouter = require('./user.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');

/**
 * Mounts the postRouter middleware at the '/posts' path.
 * @name router.use/posts
 */
router.use('/posts', postRouter);

/**
 * Mounts the userRouter middleware at the '/users' path.
 * @name router.use/users
 */
router.use('/users', userRouter);

/**
 * Mounts the commentRouter middleware at the '/comments' path.
 * @name router.use/comments
 */
router.use('/comments', commentRouter);

/**
 * Mounts the errorHandlerApi middleware.
 * @name router.use/errorHandlerApi
 */
router.use(errorHandlerApi);

/**
 * Mounts the notFoundApi middleware.
 * @name router.use/notFoundApi
 */
router.use(notFoundApi);

module.exports = router;
