const router = require('express').Router();
const { validate } = require('../../middlewares');

const {
  signupUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser
} = require('./user.controller');
const { createUserValidation } = require('./user.validation');

router.get('/', getUsers);

router.post('/signup', validate(createUserValidation), signupUser);

router.post('/login', loginUser);

router.get('/:user_id', getUser);

router.delete('/:user_id', deleteUser);

module.exports = router;
