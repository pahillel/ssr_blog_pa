const router = require('express').Router();
const { checkAuth } = require('../middlewares');

router.get('/', (req, res) => {
  res.render('index', { isAuth: !!req.cookies.token });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/posts', checkAuth, (req, res) => {
  res.render('posts', { isAuth: !!req.cookies.token });
});

module.exports = router;
