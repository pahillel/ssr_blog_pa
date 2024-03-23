const router = require('express').Router();
const { validate, checkAuth } = require('../../middlewares');
const { getAllPosts, createPost, deletePost } = require('./posts.controller');
const {
  createPostValidation,
  deletePostValidation
} = require('./posts.validation');

router.get('/', getAllPosts);

router.post('/', validate(createPostValidation), createPost);

router.delete(
  '/:postId',
  checkAuth,
  validate(deletePostValidation),
  deletePost
);

module.exports = router;
