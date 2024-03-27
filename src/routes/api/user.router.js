const router = require('express').Router();

const userController = require('../../controllers/user.controller');
const { isAdminApi, isAuthApi } = require('../../middlewares/guards');
const validate = require('../../middlewares/validate');
const {
  createUserValidation,
  loginUserValidation,
  deleteUsersValidation
} = require('../../validations/user.validation');

/**
 * Route for user login.
 * @name POST /api/user/login
 * @memberof module:routes/api/user.router
 * @param {function} validate - Middleware function to validate the request body.
 */
router.post('/login', validate(loginUserValidation), userController.login);

/**
 * Route for user signup.
 * @name POST /api/user/signup
 * @memberof module:routes/api/user.router
 * @param {function} validate - Middleware function to validate the request body.
 */
router.post('/signup', validate(createUserValidation), userController.signup);

/**
 * Route for user logout.
 * @name POST /api/user/logout
 * @memberof module:routes/api/user.router
 */
router.post('/logout', userController.logout);

/**
 * Route for getting all users.
 * @name GET /api/users/
 * @memberof module:routes/api/user.router
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 * @param {function} isAdminApi - Middleware function to check if the user is an admin.
 */
router.get('/', isAuthApi, isAdminApi, userController.getAllUsers);

/**
 * Route for deleting a user.
 * @name DELETE /api/users/:userId
 * @memberof module:routes/api/user.router
 * @param {string} userId - The ID of the user to delete.
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 * @param {function} isAdminApi - Middleware function to check if the user is an admin.
 * @param {function} validate - Middleware function to validate the request parameters.
 */
router.delete(
  '/:userId',
  isAuthApi,
  isAdminApi,
  validate(deleteUsersValidation),
  userController.deleteUser
);

module.exports = router;
