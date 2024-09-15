// app.js
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const socket = require('./socket');

// Load environment variables from .env files
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const sequelize = require('./config/db');
const adminBlogRoutes = require('./routes/adminBlogRoutes');
const userBlogRoutes = require('./routes/userBlogRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/admin/blogs', adminBlogRoutes);
app.use('/blogs', userBlogRoutes);

const server = http.createServer(app);
const io = socket.init(server); // Initialize Socket.IO

app.use('/uploads', express.static('uploads'));

// Add event listener for socket connection
io.on('connection', (socket) => {
  console.log('User connected');
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
