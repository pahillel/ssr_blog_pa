const postService = require('../services/post.service');

class PostController {
  async getMyPosts(req, res) {
    try {
      const posts = await postService.getUserPosts(req.user._id);

      if (!posts) {
        throw new Error('Posts not found');
      }

      res.status(200).send(posts);
    } catch (error) {
      console.log('getMyPosts', error.message);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postService.getAllPosts();

      if (!posts) {
        throw new Error('Posts not found');
      }

      res.status(200).send(posts);
    } catch (error) {
      console.log('getAllPosts', error.message);
      next(error);
    }
  }

  async createNewPost(req, res) {
    try {
      const { content } = req.body;

      const payload = {
        content,
        author: req.user
      };

      const post = await postService.createPost(payload);

      if (!post) {
        throw new Error('Post not created');
      }

      res.status(201).send(post);
    } catch (error) {
      console.log('createNewPost', error.message);
    }
  }
}

module.exports = new PostController();
