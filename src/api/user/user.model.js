const mongoose = require('mongoose');

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

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
