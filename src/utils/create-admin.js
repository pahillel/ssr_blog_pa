const userService = require('../services/user.service');
const { openConnection, closeConnection } = require('../connection');

(async () => {
  try {
    await openConnection();

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
    console.error('Error creating admin', error);
  } finally {
    closeConnection();
  }
})();
