const router = require('express').Router();
const { validate } = require('../../middlewares');

const {
  signUpUser,
  loginUser,
  logoutUser,
  getAllUsers,
  // getUserById,
  deleteUser
} = require('./user.controller');
const { createUserValidation } = require('./user.validation');

router.post('/signup', validate(createUserValidation), signUpUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/', getAllUsers);

// router.get('/:user_id', getUserById);

router.delete('/:user_id', deleteUser);

module.exports = router;
