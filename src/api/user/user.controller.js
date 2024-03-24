const config = require('config');
const userService = require('./user.service');
const { generateToken } = require('../../utils/helpers');

class UserController {
  // async getUser(req, res) {
  //   try {
  //     const { userId } = req.params;
  //     const user = await userService.getUser(userId);

  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await userService.deleteUser(userId);

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers(req.user._id);

      if (!users) {
        throw new Error('Users not found');
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res, next) {
    try {
      const user = await userService.login(req.body);

      if (!user) {
        throw new Error('User not found');
      }

      const token = generateToken(user);

      // console.log('API TOKEN', token);

      // res.cookie('token', token, { ...config.cookies, secure: true });
      res.status(200).json(token);

      // req.user = user;

      // console.log('API LOGIN', req.user);
      // next();

      // res.status(200).json(token);
    } catch (error) {
      console.log(error.message);

      res.status(500).json({ message: error.message });
    }
  }

  async register(req, res) {
    try {
      const user = await userService.createUser(req.body);

      if (!user) {
        throw new Error('User already exists');
      }

      // const token = generateToken(user);
      // res.cookie('token', token, { ...config.cookies, secure: true });
      req.user = user;
      next();
      // res.status(201).json(token);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      await userService.logout(req.session);
      res.clearCookie('token');
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const userController = new UserController();

module.exports = userController;
