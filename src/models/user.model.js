const mongoose = require('mongoose');
const PostModel = require('./post.model');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('remove', async (next) => {
  try {
    await PostModel.deleteMany({ author: this._id });
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
