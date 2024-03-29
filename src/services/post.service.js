const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const CommentModel = require('../models/comment.model');

const { errorMessages } = require('../constants');

const authorPopulate = {
  path: 'author',
  model: UserModel,
  select: 'userName'
};

class PostService {

  async getUserPosts(author) {
    const posts = await PostModel.find({ author })
      .populate([authorPopulate])
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return posts;
  }

  async createPost(dto) {
    const { content, author } = dto;

    const post = await PostModel.create({ content, author });

    return post;
  }

  async getPost(postId) {
    const post = await PostModel.findById(postId)
      .populate([
        authorPopulate,
        {
          path: 'comments',
          model: CommentModel,
          options: { sort: { createdAt: -1 } },
          populate: authorPopulate
        }
      ])
      .lean()
      .exec();

    return post;
  }

  async getAllPosts() {
    const posts = await PostModel.find()
      .populate([authorPopulate])
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return posts;
  }

  async deletePost(postId, userId) {
    const post = await PostModel.findOneAndDelete({
      _id: postId,
      author: userId
    });

    if (!post) {
      throw new Error(errorMessages.NO_PERMISSION);
    }

    await CommentModel.deleteMany({ post: postId });

    return post;
  }
}

const postService = new PostService();

module.exports = postService;
