const router = require('express').Router();
const { validate } = require('../../middlewares');
const { signupUser, loginUser, logoutUser } = require('./users.controller');
const {
  createUserValidation,
  loginUserValidation
} = require('./user.validation');
// router.get('/');

// router.get('/:user_id');

router.post('/logout', logoutUser);

router.post('/login', validate(loginUserValidation), loginUser);

router.post('/signup', validate(createUserValidation), signupUser);

module.exports = router;
