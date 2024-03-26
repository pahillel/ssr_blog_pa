const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const { isAdminApi, isAuthApi } = require('../../middlewares/guards');

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/logout', userController.logout);

router.get('/', isAuthApi, isAdminApi, userController.getAllUsers);

router.delete('/:userId', isAuthApi, isAdminApi, userController.deleteUser);

module.exports = router;
