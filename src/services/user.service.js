const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');
const CommentModel = require('../models/comment.model');

const { hashPassword } = require('../utils/auth');

class UserService {
  async login(userName) {
    const user = await UserModel.findOne({ userName });

    return user;
  }

  async createUser(dto) {
    const { userName, email, password, role = 'user' } = dto;

    const candidate = await UserModel.findOne({ email, userName });

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

  async getUserByName(userName) {
    const user = await UserModel.findOne({ userName }).lean().exec();

    return user;
  }

  async getAllUsers(userId) {
    const users = await UserModel.find({ _id: { $ne: userId } })
      .select('userName email role createdAt')
      .lean()
      .exec();

    return users;
  }

  async deleteUser(userId) {
    await PostModel.deleteMany({ author: userId });
    await CommentModel.deleteMany({ author: userId });
    await UserModel.deleteOne({ _id: userId });
  }
}

module.exports = new UserService();
