const config = require('config');
const userService = require('../services/user.service');
const { signToken } = require('../utils/auth');
const { statusCode, response } = require('../constants');

class UserController {
  async login(req, res, next) {
    try {
      const user = await userService.login(req.body);

      if (!user) {
        throw new Error('User not found');
      }

      const payload = {
        _id: user._id.toString(),
        role: user.role
      };
      const token = signToken(payload);

      res.cookie('token', token, { ...config.cookies });

      response(res, {
        status: statusCode.OK,
        data: token
      });
    } catch (error) {
      next(error);
    }
  }

  async signup(req, res, next) {
    try {
      const user = await userService.createUser(req.body);

      if (!user) {
        throw new Error('User already exists');
      }

      const payload = {
        _id: user._id.toString(),
        role: user.role
      };
      const token = signToken(payload);

      res.cookie('token', token, { ...config.cookies });

      response(res, {
        status: statusCode.OK,
        data: token
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('token');

      response(res, {
        status: statusCode.OK
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      if (!users) {
        throw new Error('Users not found');
      }

      response(res, {
        status: statusCode.OK,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;

      await userService.deleteUser(userId);

      response(res, {
        status: statusCode.NO_CONTENT
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
