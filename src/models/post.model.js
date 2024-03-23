const mongoose = require('mongoose');

/**
 * @typedef {import('./comment.model').CommentModel} CommentModel
 */
const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
      }
    ]
  },
  {
    timestamps: true,
    collection: 'posts'
  }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
