const router = require('express').Router();

const { isAuth, tokenSession, saveSession } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/guards');
const { setTemplateParams } = require('../../middlewares/shared');

const postsController = require('../../controllers/posts.controller');
const userController = require('../../controllers/user.controller');

router.use(setTemplateParams);

router.get('/', postsController.renderHomePage);
router.get('/login', userController.renderLoginPage);
router.get('/signup', userController.renderSignUpPage);
router.get('/posts', isAuth, postsController.renderPostsPage);
router.get('/logout', userController.logout);
router.get('/users', isAuth, isAdmin, userController.renderUsersPage);
router.post('/posts/:postId');

// router.post('/login', userController.login, saveSession, tokenSession);
// router.post('/signup', userController.signup, saveSession, tokenSession);
// router.post('/posts', isAuth, postsController.createPost);

module.exports = router;
