const userService = require('./users.service');

const signupUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    if (!user) {
      throw new Error('User not created');
    }

    res.redirect('/posts');
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body);

    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.log('req.session.save', err);
        next(err);
      } else {
        res.redirect('/');
      }
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await userService.logoutUser(req.session);

    res.clearCookie('token');

    res.redirect('/login');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser
};
