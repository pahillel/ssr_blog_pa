const mongoose = require('mongoose');

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
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    collection: 'posts'
  }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
