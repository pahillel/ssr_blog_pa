const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');
const { errorMessages } = require('../constants');

class CommentService {
  async createComment(comment, postId, author) {
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const newComment = await CommentModel.create({
      comment,
      author,
      post: postId
    });

    return newComment;
  }

  async deleteComment(commentId, authorId) {
    const deletedComment = await CommentModel.findOneAndDelete({
      _id: commentId,
      author: authorId
    });

    if (!deletedComment) {
      throw new Error(errorMessages.NO_PERMISSION);
    }

    return deletedComment;
  }
}

const commentService = new CommentService();

module.exports = commentService;
