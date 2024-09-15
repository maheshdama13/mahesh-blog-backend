const express = require('express');
const blogController = require('../controllers/blogController');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogDetail);
router.post('/', blogController.createBlog);
router.delete('/:id', blogController.deleteBlog);
router.patch('/:id/publish', blogController.togglePublishBlog);

router.get('/:blogId/posts', postController.getPostsByBlogId);
router.post('/:blogId/posts', postController.uploadImage, postController.createPost);
router.delete('/:blogId/posts/:id', postController.deletePost);
router.put('/:blogId/posts/:id', postController.uploadImage, postController.updatePost);

module.exports = router;