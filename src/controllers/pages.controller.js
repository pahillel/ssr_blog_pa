const postService = require('../services/post.service');

class PagesController {
  async renderIndex(req, res, next) {
    try {
      const posts = await postService.getAllPosts();

      res.render('index', { posts });
    } catch (error) {
      next(error);
    }
  }

  async renderLogin(req, res) {
    if (!!req.user) {
      res.redirect('/');
    }

    res.render('login');
  }

  async renderSignup(req, res) {
    if (!!req.user) {
      res.redirect('/');
    }

    res.render('signup');
  }

  async renderHome(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/login');
      }

      const posts = await postService.getUserPosts(req.user._id);

      res.render('home', { posts });
    } catch (error) {
      next(error);
    }
  }

  async renderUsers(req, res) {}
}

module.exports = new PagesController();
