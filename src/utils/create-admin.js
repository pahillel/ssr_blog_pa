const userService = require('../services/user.service');

const createAdmin = async () => {
  try {
    const admin = await userService.checkExistAdmin();

    if (admin) {
      return;
    }

    const payload = {
      userName: 'admin',
      password: 'admin123',
      email: 'admin@gmail.com',
      role: 'admin'
    };

    await userService.createUser(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin
};
