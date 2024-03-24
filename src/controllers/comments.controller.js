const commentService = require('../services/comment.service');

class CommentsController {
  async createComment(req, res) {
    try {
      const { postId } = req.params;

      const comment = await commentService.addComment(
        req.body.comment,
        postId,
        req.user._id
      );

      if (!comment) {
        throw new Error('Comment not created');
      }

      res.redirect('/posts/' + postId);
    } catch (e) {}
  }

  async deleteComment(req, res) {}
}

module.exports = new CommentsController();
