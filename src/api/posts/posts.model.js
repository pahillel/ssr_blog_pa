const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'posts',
    autoIndex: true
  }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
