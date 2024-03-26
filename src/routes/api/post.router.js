const router = require('express').Router();
const postController = require('../../controllers/post.controller');
const validate = require('../../middlewares/validate');
const {
  getUserPostsValidation,
  getPostValidation,
  createPostValidation
} = require('../../validations/post.validation');
const { isAuthApi } = require('../../middlewares/guards');

router.get('/', postController.getAllPosts);

router.get(
  '/user/:userId',
  isAuthApi,
  validate(getUserPostsValidation),
  postController.getUserPosts
);

router.post(
  '/',
  isAuthApi,
  validate(createPostValidation),
  postController.createNewPost
);

router.get('/:postId', validate(getPostValidation), postController.getPost);

router.delete(
  '/:postId',
  isAuthApi,
  validate(getPostValidation),
  postController.deletePost
);

module.exports = router;
