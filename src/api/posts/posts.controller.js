const postsService = require('./posts.service');

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { user } = req.session;

    await postsService.createPost(req.body, user);

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    console.log('deletePost', req.params);

    const { postId } = req.params;

    await postsService.deletePost(postId);

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost
};
