const router = require('express').Router();

const pagesController = require('../../controllers/pages.controller');
const templateLocals = require('../../middlewares/template-locals');
const { isAuth, isAdmin, isAnonymous } = require('../../middlewares/guards');
const { errorHandler, notFound } = require('../../middlewares/global');

/**
 * Middleware function to set view templates variables.
 * @function
 * @name templateLocals
 */
router.use(templateLocals);

/**
 * Route for rendering the index page.
 * @name GET /
 * @memberof module:routes/pages/index
 */
router.get('/', pagesController.renderIndex);

/**
 * Route for rendering the login page.
 * @name GET /login
 * @memberof module:routes/pages/index
 */
router.get('/login', isAnonymous, pagesController.renderLogin);

/**
 * Route for rendering the signup page.
 * @name GET /signup
 * @memberof module:routes/pages/index
 */
router.get('/signup', isAnonymous, pagesController.renderSignup);

/**
 * Route for rendering the posts page.
 * @name GET /posts
 * @name GET /posts/users/:userId
 * @memberof module:routes/pages/index
 */
router.get(
  ['/posts', '/posts/users/:userId'],
  isAuth,
  pagesController.renderPosts
);

/**
 * Route for rendering the users page.
 * @name GET /users
 * @memberof module:routes/pages/index
 */
router.get('/users', isAdmin, pagesController.renderUsers);

/**
 * Route for rendering a specific post page.
 * @name GET /posts/:postId
 * @memberof module:routes/pages/index
 */
router.get('/posts/:postId', pagesController.renderPostPage);

/**
 * Middleware function to catch errors.
 * @function
 * @name templateLocals
 */
router.use(errorHandler);

/**
 * Middleware function to catch 404 errors.
 * @function
 * @name templateLocals
 */
router.use(notFound);

module.exports = router;
