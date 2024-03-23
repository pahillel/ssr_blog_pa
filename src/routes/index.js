const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts.controller');
const userController = require('../controllers/user.controller');

router.get('/', postsController.renderHomePage);
router.get('/login', userController.renderLoginPage);
router.get('/signup', userController.renderSignUpPage);

module.exports = router;
