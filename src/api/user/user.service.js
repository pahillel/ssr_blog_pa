const UserModel = require('./user.model');
const { hashPassword } = require('../../services/auth');

const createUser = async (dto) => {
  const data = {
    userName: dto.userName,
    email: dto.email,
    role: 'user',
    password: await hashPassword(dto.password)
  };

  return UserModel.create(data);
};

const findUser = async (body) => {
  const { email } = body;
  const user = UserModel.findOne({ email }).lean().exec();

  return user;
};

const findUserById = async (user_id) => {
  return UserModel.findById(user_id);
};

const getAllUsers = async () => {
  return UserModel.find().lean().exec();
};

module.exports = {
  createUser,
  getAllUsers,
  findUser,
  findUserById
};
