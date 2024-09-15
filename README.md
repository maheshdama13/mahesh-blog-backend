# Live Blog Backend

This is the backend service for the Live Blog application, built using Node.js, Express, Sequelize ORM, and MySQL. It handles the creation, update, and retrieval of blog posts with support for image uploads and embedding social media posts (Facebook/Twitter) or scraping metadata from URLs.

## Features

- Create, update, and retrieve blog posts.
- Upload images and embed media (Facebook, Twitter).
- Scrape metadata from external URLs.
- Real-time updates with WebSockets (optional, only needed for live blog updates).
- Sequelize ORM for interacting with MySQL.

## Requirements

- Node.js (v16 or higher)
- MySQL database
- npm (v6 or higher)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/maheshdama13/mahesh-blog-backend.git
cd mahesh-blog-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3.Configure MySQL Database
Copy the content of `example.env.production` and create a new env file having name `.env.production` and paste.
Verify the database name and credentials.

### 4. Set up the MySQL database
You can manually create the `mahesh_blog_db` database in MySQL or database mentioned in the .env.production file 

### 5. Run the application
```bash
npm run start:prod
```
It will automatically sync the Sequelize models with the database:

## Dependencies
- Express.js - Web framework for Node.js.
- Sequelize - ORM for interacting with MySQL.
- Socket.io - For real-time communication.
- Multer - Middleware for handling file uploads.
- Axios - For making external HTTP requests (used for metadata scraping).
