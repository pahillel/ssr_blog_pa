const postService = require('../services/post.service');
const userService = require('../services/user.service');

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

  async renderUsers(req, res, next) {
    try {
      if (!req.user) {
        res.redirect('/login');
      }

      if (req.user.role !== 'admin') {
        res.redirect('/');
      }

      const users = await userService.getAllUsers();

      res.render('users', { users });
    } catch (error) {
      next(error);
    }
  }

  async renderPostPage(req, res, next) {
    try {
      const { postId } = req.params;

      const post = await postService.getPost(postId);

      res.render('post', { post });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PagesController();
