const router = require('express').Router();

const { isAuth } = require('../../middlewares/auth');
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
router.get('/posts/:postId', postsController.renderPostPage);
router.get('/users/:userId', isAuth, isAdmin, userController.removeUser);

module.exports = router;
