const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'users',
    autoIndex: true
  }
);

userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
