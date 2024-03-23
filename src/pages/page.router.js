const router = require('express').Router();
const postsService = require('../api/posts/posts.service');
const { checkAuth } = require('../middlewares');

router.get('/', async (req, res) => {
  try {
    console.log('/', req.session);

    const posts = await postsService.getAllPosts();

    // console.log(posts);

    res.render('index', { isAuth: !!req.cookies.token, posts });
  } catch (error) {}
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
