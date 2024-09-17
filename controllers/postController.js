const { default: axios } = require("axios");
const postService = require("../services/postService");
const path = require("path");

const { getIO } = require("../socket");
const multer = require("multer");
const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
]);

const getPostsByBlogId = async (req, res) => {
  const { blogId } = req.params;
  const posts = await postService.getPostsByBlogId(blogId);
  res.json(posts);
};

// Configure Multer for file uploads and retain the original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images will be stored
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname; // preserve the original name
    const ext = path.extname(originalName); // get the file extension
    const baseName = path.basename(originalName, ext); // get the base name without extension
    cb(null, `${baseName}-${Date.now()}${ext}`); // custom filename format
  },
});

const upload = multer({ storage });

const createPost = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, description, facebookEmbed, twitterEmbed, metaUrl } =
      req.body;
    let imageUrl = null;

    if (req.file) {
      // path of the file
      imageUrl = `/uploads/${req.file.filename}`;
    }

    let metaTitle, metaDescription, metaImage;
    if (metaUrl) {
      const response = await axios.get(metaUrl);
      const metadata = await metascraper({
        html: response.data,
        url: metaUrl,
      });
      metaTitle = metadata.title;
      metaDescription = metadata.description;
      metaImage = metadata.image;
    }

    const post = await postService.createPost({
      blogId,
      title,
      description,
      imageUrl,
      facebookEmbed,
      twitterEmbed,
      metaUrl,
      metaTitle,
      metaDescription,
      metaImage,
    });

    const posts = await postService.getPostsByBlogId(blogId);
    // Emit the event via Socket.IO
    const io = getIO();
    io.emit(`update-posts-${blogId}`, posts); // Send the blog post to all connected clients

    post.imageUrl = post.imageUrl ? `${process.env.APP_URL}${post.imageUrl}` : null;
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deletePost = async (req, res) => {
  const { blogId, id } = req.params;
  try {
    await postService.deletePost(id);

    const posts = await postService.getPostsByBlogId(blogId);
    // Emit the event via Socket.IO
    const io = getIO();
    io.emit(`update-posts-${blogId}`, posts); // Send the blog post to all connected clients

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, description, facebookEmbed, twitterEmbed, metaUrl } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log(imageUrl);
    console.log("________ imageUrl");

    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    post.title = title || post.title;
    post.description = description || post.description;
    post.imageUrl = imageUrl || post.imageUrl;
    post.facebookEmbed = facebookEmbed || post.facebookEmbed;
    post.twitterEmbed = twitterEmbed || post.twitterEmbed;
    post.metaUrl = metaUrl || post.metaUrl;

    await post.save();

    const posts = await postService.getPostsByBlogId(post.blogId);
    // Emit the event via Socket.IO
    const io = getIO();
    io.emit(`update-posts-${post.blogId}`, posts);

    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
};

// Middleware for handling image upload
const uploadImage = upload.single("image");

module.exports = {
  getPostsByBlogId,
  createPost,
  deletePost,
  updatePost,
  uploadImage,
};
