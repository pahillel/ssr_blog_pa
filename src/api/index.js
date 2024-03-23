const router = require('express').Router();

const usersModule = require('./users');
// const postsModule = require('./posts');
// const commentsModule = require('./comments');

router.use('/users', usersModule);

// router.use('/posts', postsModule);

// router.use('/comments', commentsModule);

module.exports = router;
