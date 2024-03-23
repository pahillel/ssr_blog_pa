const UserModel = require('./user.model');

const createUser = async (dto) => {
  return UserModel.create(dto);
};

const findUser = async (body) => {
  const { email, password } = body;

  const user = UserModel.findOne({ email, password }).lean().exec();

  return user;
};

const getUserById = async (user_id) => {
  return UserModel.findById(user_id);
};

const getAllUsers = async () => {
  return UserModel.find();
};

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  findUser
};
