const router = require('express').Router();
const publicController = require('./public.controller');
const {
  templateLocals,
  saveSession,
  publicSession
} = require('../middlewares');
const { isAuth } = require('../guards');

router.use(templateLocals);

router.get('/', publicController.renderMainPage);

router.get('/login', publicController.renderLoginPage);

router.get('/signup', publicController.renderSignPage);

router.get('/logout', publicController.logout);

router.post('/login', publicController.loginUser);
router.post('/signup', publicController.signupUser);
// router.post('/login', publicController.loginUser, saveSession, tokenSession);
// router.post('/signup', publicController.signupUser, saveSession, tokenSession);

router.post('/posts', publicController.createPost);

module.exports = router;
