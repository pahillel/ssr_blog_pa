const userService = require('../services/user.service');

class UserController {
  async renderLoginPage(req, res) {
    try {
      res.render('login');
    } catch (error) {}
  }

  async renderSignUpPage(req, res) {
    try {
      res.render('signup');
    } catch (error) {}
  }

  async renderUsersPage(req, res) {
    try {
      const users = await userService.getAllUsers(req.user._id);

      res.render('users', { users });
    } catch (error) {}
  }

  async removeUser(req, res) {
    try {
    } catch (error) {}
  }

  async login(req, res, next) {
    try {
      const user = await userService.login(req.body.userName);

      if (!user) {
        throw new Error('User not found');
      }

      req.user = user;

      next();
    } catch (error) {}
  }

  async signup(req, res, next) {
    try {
      const user = await userService.createUser(req.body);

      if (!user) {
        throw new Error('User already exists');
      }

      req.user = user;

      next();
    } catch (error) {}
  }

  async logout(req, res) {
    try {
      // TODO: why don't remove document from DB?
      req.session.destroy();
      req.session = null;

      res.clearCookie('token');
      res.redirect('/login');
    } catch (error) {}
  }

  getAll(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = new UserController();
