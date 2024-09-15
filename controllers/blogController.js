const blogService = require('../services/blogService');
const { getIO } = require('../socket'); 

const getAllBlogs = async (req, res) => {
  const blogs = await blogService.getAllBlogs();
  res.json(blogs);
};

const getBlogDetail = async (req, res) => {
  const { id } = req.params;
  const blogDetail = await blogService.getBlogById(id, {onlyPublished: true});
  if(blogDetail) {
    res.json(blogDetail);
  } else {
    res.sendStatus(404);
  }

};

const createBlog = async (req, res) => {
  const { name } = req.body;
  const blog = await blogService.createBlog(name);

  const blogs = await blogService.getPublishedBlogs();

  // Emit the event via Socket.IO
  const io = getIO(); 
  io.emit('update-blogs', blogs); // Send the blog post to all connected clients
  
  res.json(blog);
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  await blogService.deleteBlog(id);
  res.sendStatus(200);
};

const togglePublishBlog = async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;

  await blogService.togglePublishBlog(id, isPublished);

  const blogs = await blogService.getPublishedBlogs();
  // Emit the event via Socket.IO
  const io = getIO(); 
  io.emit('update-blogs', blogs); // Send the blog post to all connected clients
  // res.sendStatus(200);


  res.json(await blogService.getBlogById(id, {onlyPublished: false}));

  
};

const getUserBlogs = async(req, res) => {
  const blogs = await blogService.getPublishedBlogs();
  res.json(blogs);
}

module.exports = {
  getAllBlogs,
  getBlogDetail,
  createBlog,
  deleteBlog,
  togglePublishBlog,
  getUserBlogs
};