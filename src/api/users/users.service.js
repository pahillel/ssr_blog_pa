const UserModel = require('./users.model');
const { hashPassword, checkPassword } = require('../../utils/password');
const { generateToken } = require('../../utils/auth');

const createUser = async (data) => {
  try {
    const hashPass = await hashPassword(data.password);

    const user = await UserModel.create({
      email: data.email,
      userName: data.userName,
      password: hashPass
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (body) => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email }).lean().exec();

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Invalid email or password');
  }

  return user;
};

const logoutUser = async (session) => {
  return session.destroy();
};

const getUserById = async (userId) => {
  return UserModel.findById(userId).select('userName').lean().exec();
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUserById
};
