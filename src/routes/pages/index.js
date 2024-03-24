const router = require('express').Router();

const { isAuth, tokenSession, saveSession } = require('../../middlewares/auth');

const postsController = require('../../controllers/posts.controller');
const userController = require('../../controllers/user.controller');

router.get('/', postsController.renderHomePage);
router.get('/login', userController.renderLoginPage);
router.get('/signup', userController.renderSignUpPage);
router.get('/posts', isAuth, postsController.renderPostsPage);
router.get('/logout', userController.logout);

router.post('/login', userController.login, saveSession, tokenSession);
router.post('/signup', userController.signup, saveSession, tokenSession);

module.exports = router;
