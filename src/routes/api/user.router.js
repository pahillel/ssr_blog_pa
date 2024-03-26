const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const { isAdminApi, isAuthApi } = require('../../middlewares/guards');
const validate = require('../../middlewares/validate');
const {
  createUserValidation,
  loginUserValidation,
  deleteUsersValidation
} = require('../../validations/user.validation');

router.post('/login', validate(loginUserValidation), userController.login);

router.post('/signup', validate(createUserValidation), userController.signup);

router.post('/logout', userController.logout);

router.get('/', isAuthApi, isAdminApi, userController.getAllUsers);

router.delete(
  '/:userId',
  isAuthApi,
  isAdminApi,
  validate(deleteUsersValidation),
  userController.deleteUser
);

module.exports = router;
