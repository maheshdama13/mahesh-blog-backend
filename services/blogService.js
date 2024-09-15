const Blog = require('../models/Blog');

const getAllBlogs = async () => {
  return await Blog.findAll();
};

const getPublishedBlogs = async () => {
  return await Blog.findAll({ where: { isPublished: true } });
};

const getBlogById = async (id, {onlyPublished=false}) => {
  if(!onlyPublished)
    return await Blog.findByPk(id);
    
  return await Blog.findOne({ where: { id, isPublished: true } });
};

const createBlog = async (name) => {
  return await Blog.create({ name });
};

const deleteBlog = async (id) => {
  return await Blog.destroy({ where: { id } });
};

const togglePublishBlog = async (id, isPublished) => {
  return await Blog.update({ isPublished }, { where: { id } });
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  getBlogById,
  togglePublishBlog,
  getPublishedBlogs
};