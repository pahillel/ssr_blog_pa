const router = require('express').Router();

const postController = require('../../controllers/post.controller');
const validate = require('../../middlewares/validate');
const {
  getUserPostsValidation,
  getPostValidation,
  createPostValidation
} = require('../../validations/post.validation');
const { isAuthApi } = require('../../middlewares/guards');

/**
 * Route for getting all posts.
 * @name GET /
 * @memberof module:routes/api/post.router
 */
router.get('/', postController.getAllPosts);

/**
 * Route for getting posts by user ID.
 * @name GET /api/posts/user/:userId
 * @memberof module:routes/api/post.router
 * @param {string} userId - The ID of the user to get posts for.
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 * @param {function} validate - Middleware function to validate the request body.
 */
router.get(
  '/user/:userId',
  isAuthApi,
  validate(getUserPostsValidation),
  postController.getUserPosts
);

/**
 * Route for creating a new post.
 * @name POST /api/posts
 * @memberof module:routes/api/post.router
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 * @param {function} validate - Middleware function to validate the request body.
 */
router.post(
  '/',
  isAuthApi,
  validate(createPostValidation),
  postController.createNewPost
);

/**
 * Route for getting a post by ID.
 * @name GET /api/posts/:postId
 * @memberof module:routes/api/post.router
 * @param {string} postId - The ID of the post to get the details for.
 * @param {function} validate - Middleware function to validate the request body.
 */
router.get('/:postId', validate(getPostValidation), postController.getPost);

/**
 * Route for deleting a post by ID.
 * @name DELETE /api/posts/:postId
 * @memberof module:routes/api/post.router
 * @param {string} postId - The ID of the post to delete.
 * @param {function} isAuthApi - Middleware function to check if the user is authenticated.
 * @param {function} validate - Middleware function to validate the request body.
 */
router.delete(
  '/:postId',
  isAuthApi,
  validate(getPostValidation),
  postController.deletePost
);

module.exports = router;
