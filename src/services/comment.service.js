const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');

class CommentService {
  async addComment(comment, postId, author) {
    const newComment = await CommentModel.create({
      comment,
      author,
      post: postId
    });

    await PostModel.findByIdAndUpdate(postId, {
      $push: {
        comments: newComment._id
      }
    });

    return newComment;
  }

  async deleteComment(commentId) {
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);

    return deletedComment;
  }
}

module.exports = new CommentService();
