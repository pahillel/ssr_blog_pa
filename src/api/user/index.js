const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  deleteUser
} = require('./user.controller');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:user_id', getUser);

router.delete('/:user_id', deleteUser);

module.exports = router;
