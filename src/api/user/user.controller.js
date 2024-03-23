const userService = require('./user.service');
const { response, statusCodes } = require('../../constants');

const signupUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);

    if (!result) {
      // response(res, { status: statusCodes.BAD_REQUEST, data: null });
      throw new Error('User not created');
    }

    // loginUser(req, res, next);
    response(res, { status: statusCodes.CREATED, data: result });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await userService.findUser(req.body);

    if (!user) {
    }

    response(res, { status: statusCodes.OK, data: user });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();

    if (!result) {
      console.log('here');
      next(new Error('Users not found'));
    }

    res.status(200).json(result);
  } catch (error) {
    console.log('catch');
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.user_id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log('deleteUser');
  } catch (error) {}
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser
};
