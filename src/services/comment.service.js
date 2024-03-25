const CommentModel = require('../models/comment.model');

class CommentService {
  async createComment(comment, postId, author) {
    const newComment = await CommentModel.create({
      comment,
      author,
      post: postId
    });

    return newComment;
  }

  async deleteComment(commentId) {
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    return deletedComment;
  }

  async getComment(commentId, authorId) {
    const comment = await CommentModel.findOne({
      _id: commentId,
      author: authorId
    });

    return comment;
  }
}

const commentService = new CommentService();

module.exports = commentService;
