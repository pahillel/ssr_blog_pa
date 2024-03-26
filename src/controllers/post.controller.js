const postService = require('../services/post.service');

class PostController {
  async getUserPosts(req, res, next) {
    try {
      const posts = await postService.getUserPosts(req.user._id);

      if (!posts) {
        throw new Error('Posts not found');
      }

      res.status(200).send(posts);
    } catch (error) {
      next(error);
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
      next(error);
    }
  }

  async createNewPost(req, res, next) {
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
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      const { _id } = req.user;

      await postService.deletePost(postId, _id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getPost(req, res, next) {
    try {
      const { postId } = req.params;

      const post = await postService.getPost(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      res.status(200).send(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
