const Post = require('../models/Post');

const getPostsByBlogId = async (blogId) => {
  const posts = await Post.findAll({ where: { blogId } });
  return posts.map((val) => ({...val.toJSON(), imageUrl: val.imageUrl ? `${process.env.APP_URL}${val.imageUrl}` : null}))
};

const createPost = async (postData) => {
  return await Post.create(postData);
};

const deletePost = async (id) => {
  return await Post.destroy({ where: { id } });
};

const getPostById = async (id) => {
  return await Post.findByPk(id);
};

module.exports = {
  getPostsByBlogId,
  createPost,
  getPostById,
  deletePost
};