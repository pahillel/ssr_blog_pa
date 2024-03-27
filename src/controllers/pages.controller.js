const postService = require('../services/post.service');
const userService = require('../services/user.service');

class PagesController {
  async renderIndex(req, res, next) {
    try {
      const posts = await postService.getAllPosts();

      res.render('index', { posts, useAssets: 'posts' });
    } catch (error) {
      next(error);
    }
  }

  async renderLogin(req, res) {
    res.render('login', { active: 'login', useAssets: 'auth' });
  }

  async renderSignup(req, res) {
    res.render('signup', { active: 'signup', useAssets: 'auth' });
  }

  async renderPosts(req, res, next) {
    try {
      let userId = '';
      const isAdminRequest = req.params.userId && req.user.role === 'admin';

      if (isAdminRequest) {
        userId = req.params.userId;
      } else {
        userId = req.user._id;
      }

      const posts = await postService.getUserPosts(userId);

      res.render('home', {
        posts,
        active: isAdminRequest ? 'users' : 'posts',
        hideForm: isAdminRequest,
        useAssets: 'posts'
      });
    } catch (error) {
      next(error);
    }
  }

  async renderUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      res.render('users', { users, active: 'users', useAssets: 'users' });
    } catch (error) {
      next(error);
    }
  }

  async renderPostPage(req, res, next) {
    try {
      const { postId } = req.params;

      const post = await postService.getPost(postId);

      res.render('full-post', { post, active: 'posts', useAssets: 'post' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PagesController();
