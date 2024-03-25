const commentService = require('../services/comment.service');
const PostModel = require('../models/post.model');

class CommentController {
  async createComment(req, res) {
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

      res.status(201).send(newComment);
    } catch (error) {}
  }

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const authorId = req.user._id;

      const comment = await commentService.getComment(commentId, authorId);

      if (!comment) {
        throw new Error('Comment not found');
      }

      const deletedComment = await commentService.deleteComment(commentId);

      if (!deletedComment) {
        throw new Error('Comment not deleted');
      }

      res.status(204).send(deletedComment);
    } catch (error) {}
  }

  async getAllComments(req, res) {
    try {
      const { postId } = req.params;

      const comments = await commentService.getAllComments(postId);

      if (!comments) {
        throw new Error('Comments not found');
      }

      res.status(200).send(comments);
    } catch (error) {}
  }
}

module.exports = new CommentController();
