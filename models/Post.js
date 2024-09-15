const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Blog = require('./Blog');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebookEmbed: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  twitterEmbed: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metaUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metaImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations
Blog.hasMany(Post, { foreignKey: 'blogId' });
Post.belongsTo(Blog, { foreignKey: 'blogId' });


module.exports = Post;
