const userService = require('../services/user.service');
const { hashPassword } = require('./auth');

const createUser = async () => {
  try {
    const admin = await userService.getUserByName('admin');

    if (admin) {
      return;
    }

    await userService.createUser({
      userName: 'admin',
      password: await hashPassword('admin'),
      email: 'admin@gmail.com',
      role: 'admin'
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser
};
