const postService = require('../services/post.service');
const moment = require('moment');

moment.locale('uk');

class PostsController {
  async renderHomePage(req, res) {
    try {
      const posts = await postService.getPosts();

      posts.forEach((post) => {
        post.createdAt = moment(post.createdAt).format('L - HH:mm');
      });

      res.render('index', { posts });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async renderPostsPage(req, res) {
    try {
      const posts = await postService.getUserPosts(req.user._id);

      res.render('posts', { posts });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async renderPostPage(req, res) {
    try {
      const post = await postService.getPost(req.params.postId);

      if (!post) {
        throw new Error('Post not found');
      }

      post.createdAt = moment(post.createdAt).format('L - HH:mm');

      res.render('post', { post });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async createPost(req, res) {
    try {
      const { content } = req.body;
      const { _id } = req.user;

      const post = await postService.createPost(content, _id);

      if (!post) {
        throw new Error('Post not created');
      }

      res.redirect('/');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

module.exports = new PostsController();
