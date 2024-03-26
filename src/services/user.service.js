const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');
const CommentModel = require('../models/comment.model');
const mongoose = require('mongoose');

const { hashPassword, comparePassword } = require('../utils/auth');

class UserService {
  async login(dto) {
    const { userName, password } = dto;

    const user = await UserModel.findOne({ userName });

    if (!user) {
      throw new Error('User not found');
    }

    const isPassValid = await comparePassword(password, user.password);

    if (!isPassValid) {
      throw new Error('Password is not valid');
    }

    return user;
  }

  async createUser(dto) {
    const { userName, email, password, role = 'user' } = dto;

    const candidate = await UserModel.findOne({ userName });

    if (candidate) {
      return null;
    }

    const hashPass = await hashPassword(password);

    const user = await UserModel.create({
      userName,
      email,
      password: hashPass,
      role
    });

    return user;
  }

  async deleteUser(userId) {
    try {
      await PostModel.deleteMany({ author: userId });
      await CommentModel.deleteMany({ author: userId });
      await UserModel.deleteOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    const users = await UserModel.find()
      .select('userName email role createdAt')
      .lean()
      .exec();

    return users;
  }

  async getUser(userId) {
    const user = await UserModel.findById({ _id: userId });

    return user;
  }

  async checkExistAdmin() {
    const admin = await UserModel.findOne({
      userName: 'admin',
      email: 'admin@gmail.com'
    });

    return admin;
  }
}

const userService = new UserService();

module.exports = userService;
