const userService = require('./user.service');
const { response, statusCodes } = require('../../constants');
const { comparePasswords } = require('../../services/auth');
const { omit } = require('lodash');

const signUpUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    if (!user) {
    }

    response(res, { status: statusCodes.CREATED, data: user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await userService.findUser(req.body);

    if (!user) {
      throw new Error('User not found');
    }

    const isPassOk = await comparePasswords(req.body.password, user.password);

    if (!isPassOk) {
      throw new Error('Email or password is incorrect');
    }

    response(res, {
      status: statusCodes.OK,
      data: omit(user, ['password', '__v'])
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();

    if (!result) {
      // next(new Error('Users not found'));
    }

    response(res, { status: statusCodes.OK, data: result });
  } catch (error) {
    console.log('catch');
    next(error);
  }
};

// const getUserById = async (req, res, next) => {
//   try {
//     const user = await userService.getUserById(req.params.user_id);

//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

const deleteUser = async (req, res) => {
  try {
    console.log('deleteUser');
  } catch (error) {}
};

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  getAllUsers,
  // getUserById,
  deleteUser
};
