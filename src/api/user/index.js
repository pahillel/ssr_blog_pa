const router = require('express').Router();
const userController = require('./user.controller');

const { saveSession, apiSession } = require('../../middlewares');
const { isAdmin, isAuth } = require('../../guards');

// router.get('/:userId', userController.getUser);

router.delete('/:userId', isAuth, isAdmin, userController.deleteUser);

router.get('/', isAuth, isAdmin, userController.getAllUsers);

// router.post('/login', userController.login);
// router.post('/signup', userController.register);

router.post('/login', userController.login);
router.post('/signup', userController.register, apiSession, saveSession);

router.post('/logout', userController.logout);

module.exports = router;
