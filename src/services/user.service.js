const UserModel = require('../models/user.model');
const { hashPassword } = require('../utils/auth');

class UserService {
  async login(userName) {
    const user = await UserModel.findOne({ userName });

    return user;
  }

  async createUser(dto) {
    const { userName, email, password } = dto;

    const candidate = await UserModel.findOne({ email, userName });

    if (candidate) {
      return null;
    }

    const hashPass = await hashPassword(password);

    const user = await UserModel.create({
      userName,
      email,
      password: hashPass
    });

    return user;
  }
}

module.exports = new UserService();
