const config = require('config');
const userService = require('../services/user.service');
const { signToken } = require('../utils/auth');

class UserController {
  async login(req, res) {
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

      res.json(token);
    } catch (error) {
      console.log('login', error.message);
    }
  }

  async signup(req, res) {
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

      res.status(201).send(token);
    } catch (error) {}
  }

  async logout(req, res) {
    try {
      res.clearCookie('token');

      res.status(200).send();
    } catch (error) {}
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      if (!users) {
        throw new Error('Users not found');
      }

      res.status(200).send(users);
    } catch (error) {}
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      await userService.deleteUser(userId);

      res.status(200).send('deleted');
    } catch (error) {}
  }
}

module.exports = new UserController();
