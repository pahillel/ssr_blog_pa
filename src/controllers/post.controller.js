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

  async deletePost(req, res) {
    try {
      const { postId } = req.params;

      const result = await postService.deletePost(postId);

      if (!result) {
        throw new Error('post was not deleted');
      }

      res.status(204).send();
    } catch (error) {}
  }

  async getPost(req, res) {
    try {
      const { postId } = req.params;

      const post = await postService.getPost(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      res.status(200).send(post);
    } catch (error) {}
  }
}

module.exports = new PostController();
