const PostModel = require('../models/post.model');

class PostsController {
  async renderHomePage(req, res) {
    try {
      // const posts = await PostModel.find({});
      res.render('index', { posts: [] });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

module.exports = new PostsController();
