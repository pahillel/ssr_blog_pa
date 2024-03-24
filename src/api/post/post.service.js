const PostModel = require('./post.model');
const UserModel = require('../user/user.model');
const CommentModel = require('../comment/comment.model');

class PostService {
  async createPost(content, author) {
    const post = await PostModel.create({ content, author });

    return post;
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

  async getAllPosts() {
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

  async deletePost(postId) {
    const post = await PostModel.findByIdAndDelete(postId);

    await CommentModel.deleteMany({ post: postId });

    return post;
  }
}

const postService = new PostService();

module.exports = postService;
