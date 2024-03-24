const postService = require('./post.service');

class PostController {
  async createPost(req, res) {
    try {
      const { content } = req.body;
      const { _id } = req.user;
      console.log('API createPost', req);

      const post = await postService.createPost(content, _id);

      if (!post) {
        throw new Error('Post not created');
      }

      res.status(201).send(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }

  async getPost(req, res) {
    try {
      const { postId } = req.params;

      const post = await postService.getPost(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      res.status(200).send(post);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllPosts(req, res) {
    try {
      console.log('API', req.user);

      const posts = await postService.getAllPosts();

      if (!posts) {
        throw new Error('Post not found');
      }

      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deletePost(req, res) {
    try {
      const { postId } = req.params;

      const post = await postService.deletePost(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

const postController = new PostController();

module.exports = postController;
