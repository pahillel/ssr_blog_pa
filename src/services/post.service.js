const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');

class PostService {
  async createPost(content, author) {
    const post = await PostModel.create({ content, author });

    return post;
  }

  async getPosts() {
    const posts = await PostModel.find()
      .populate([
        {
          path: 'author',
          model: UserModel,
          select: 'userName'
        }
      ])
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return posts;
  }

  async getPost(postId) {
    const post = await PostModel.findById(postId)
      .populate([
        {
          path: 'author',
          model: UserModel,
          select: 'userName'
        }
      ])
      .lean()
      .exec();

    return post;
  }

  async getUserPosts(userId) {
    const posts = await PostModel.find({ author: userId }).lean().exec();

    return posts;
  }
}

module.exports = new PostService();
