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

  login(req, res) {
    try {
    } catch (error) {}
  }

  signup(req, res) {
    try {
    } catch (error) {}
  }

  logout(req, res) {
    try {
    } catch (error) {}
  }

  getAll(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = new UserController();
