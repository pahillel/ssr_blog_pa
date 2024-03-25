const router = require('express').Router();
const userController = require('../../controllers/user.controller');

// get all for admin role
router.get('/');

// get user posts
router.get('/home');

// login user
router.post('/login', userController.login);

// create user
router.post('/signup', userController.signup);

// logout user
router.post('/logout', userController.logout);

// delete user admin role
router.delete('/:userId');

module.exports = router;
