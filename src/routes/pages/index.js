const router = require('express').Router();

const pagesController = require('../../controllers/pages.controller');
const templateLocals = require('../../middlewares/template-locals');
const { isAuth, isAnonymous } = require('../../middlewares/guards');

router.use(templateLocals);

router.get('/', pagesController.renderIndex);

router.get('/login', isAnonymous, pagesController.renderLogin);

router.get('/signup', isAnonymous, pagesController.renderSignup);

router.get(
  ['/posts', '/posts/user/:userId'],
  isAuth,
  pagesController.renderPosts
);

router.get('/users', pagesController.renderUsers);

router.get('/posts/:postId', pagesController.renderPostPage);

module.exports = router;
