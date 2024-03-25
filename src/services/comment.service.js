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
}

const commentService = new CommentService();

module.exports = commentService;
