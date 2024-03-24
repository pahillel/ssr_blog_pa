const router = require('express').Router();

const { isAuth, tokenSession, saveSession } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/guards');

const postsController = require('../../controllers/posts.controller');
const userController = require('../../controllers/user.controller');

router.post('/login', userController.login, saveSession, tokenSession);
router.post('/signup', userController.signup, saveSession, tokenSession);
router.post('/posts', isAuth, postsController.createPost);

module.exports = router;
