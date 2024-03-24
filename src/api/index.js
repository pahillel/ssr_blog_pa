const router = require('express').Router();

const userModule = require('./user');
const postModule = require('./post');
const commentModule = require('./comment');

router.use('/users', userModule);
router.use('/posts', postModule);
router.use('/comments', commentModule);

module.exports = router;
