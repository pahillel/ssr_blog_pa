const router = require('express').Router();

const { signupUser, loginUser, logoutUser } = require('./users.controller');
// router.get('/');

// router.get('/:user_id');

router.post('/logout', logoutUser);

router.post('/login', loginUser);

router.post('/signup', signupUser);

module.exports = router;
