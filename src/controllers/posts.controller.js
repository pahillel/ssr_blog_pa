const PostModel = require('../models/post.model');

class PostsController {
  async renderHomePage(req, res) {
    try {
      res.render('index', { posts: [], isAuth: !!req.cookies.token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async renderPostsPage(req, res) {
    try {
      res.render('posts', { isAuth: !!req.cookies.token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

module.exports = new PostsController();
