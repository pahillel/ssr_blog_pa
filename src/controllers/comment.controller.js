const commentService = require('../services/comment.service');
const PostModel = require('../models/post.model');
const { statusCode, response } = require('../constants');

class CommentController {
  async createComment(req, res, next) {
    try {
      const { postId } = req.params;
      const { comment } = req.body;
      const author = req.user._id;

      const newComment = await commentService.createComment(
        comment,
        postId,
        author
      );

      if (!newComment) {
        throw new Error('Comment not created');
      }

      await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: { comments: newComment._id }
        },
        { new: true }
      );

      response(res, {
        status: statusCode.CREATED,
        data: newComment
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const authorId = req.user._id;

      await commentService.deleteComment(commentId, authorId);

      response(res, {
        status: statusCode.NO_CONTENT
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
