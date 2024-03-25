const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const { isAdmin, isAuth } = require('../../middlewares/guards');

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/logout', userController.logout);

router.get('/', isAuth, isAdmin, userController.getAllUsers);

router.delete('/:userId', isAuth, isAdmin, userController.deleteUser);

module.exports = router;
