const router = require('express').Router();

const pagesController = require('../../controllers/pages.controller');
const templateLocals = require('../../middlewares/template-locals');
const { isAuth } = require('../../middlewares/guards');

router.use(templateLocals);

router.get('/', pagesController.renderIndex);

router.get('/login', pagesController.renderLogin);

router.get('/signup', pagesController.renderSignup);

router.get('/home', isAuth, pagesController.renderHome);

router.get('/users', pagesController.renderUsers);

router.get('/posts/:postId', pagesController.renderPostPage);

module.exports = router;
