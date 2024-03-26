const postService = require('../services/post.service');
const { statusCode, response } = require('../constants');

class PostController {
  async getUserPosts(req, res, next) {
    try {
      const posts = await postService.getUserPosts(req.user._id);

      if (!posts) {
        throw new Error('Posts not found');
      }

      response(res, {
        status: statusCode.OK,
        data: posts
      });
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

      response(res, {
        status: statusCode.OK,
        data: posts
      });
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

      response(res, {
        status: statusCode.CREATED,
        data: post
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      const { _id } = req.user;

      await postService.deletePost(postId, _id);

      response(res, {
        status: statusCode.NO_CONTENT
      });
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

      response(res, {
        status: statusCode.OK,
        data: post
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
