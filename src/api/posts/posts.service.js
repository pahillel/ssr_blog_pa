const PostModel = require('./posts.model');

const getAllPosts = () => {
  return PostModel.find()
    .populate('author', 'userName')
    .sort({ createdAt: -1 })
    .lean()
    .exec();
};

const createPost = (data, user) => {
  return PostModel.create({
    text: data.text,
    author: user._id
  });
};

const deletePost = (postId) => {
  return PostModel.findOneAndDelete({ _id: postId }).exec();
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost
};
