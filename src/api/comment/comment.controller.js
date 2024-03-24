const commentService = require('./comment.service');

class CommentController {
  async createComment(req, res) {
    try {
      const { comment } = req.body;
      const { postId } = req.params;
      const { _id } = req.user;

      const result = await commentService.createComment(comment, postId, _id);

      if (!result) {
        throw new Error('Comment not created');
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const { commentId } = req.params;

      const comment = await commentService.deleteComment(commentId);

      if (!comment) {
        throw new Error('Comment not found');
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const commentController = new CommentController();

module.exports = commentController;
