const UserModel = require('./user.model');
const PostModel = require('../post/post.model');
const CommentModel = require('../comment/comment.model');

const { hashPassword, checkPassword } = require('../../utils/helpers');

class UserService {
  async login(dto) {
    const { userName, password } = dto;

    const user = await UserModel.findOne({ userName });

    if (!user) {
      throw new Error('User not found');
    }

    const isPassValid = await checkPassword(password, user.password);

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

  async logout(session) {
    await session.destroy();
  }

  async deleteUser(userId) {
    await PostModel.deleteMany({ author: userId });
    await CommentModel.deleteMany({ author: userId });
    await UserModel.deleteOne({ _id: userId });
  }

  async getAllUsers(userId) {
    const users = await UserModel.find({ _id: { $ne: userId } })
      .select('userName email role createdAt')
      .lean()
      .exec();

    return users;
  }
}

const userService = new UserService();

module.exports = userService;
