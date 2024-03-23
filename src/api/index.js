const router = require('express').Router();
const userModule = require('./user');

router.use('/user', userModule);

module.exports = router;
