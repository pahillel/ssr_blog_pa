const userService = require('../services/user.service');

const createAdmin = async () => {
  try {
    const admin = await userService.checkExistAdmin();

    if (admin) {
      console.log('Admin already exist');
      return;
    }

    const payload = {
      userName: 'admin',
      password: 'admin',
      email: 'admin@gmail.com',
      role: 'admin'
    };

    await userService.createUser(payload);
  } catch (error) {
    console.error('Admin was not created!');
  }
};

module.exports = {
  createAdmin
};
