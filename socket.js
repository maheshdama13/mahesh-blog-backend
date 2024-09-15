// socket.js
let io = null;

module.exports = {
  init: (server) => {
    const { Server } = require('socket.io');
    io = new Server(server, {
      cors: {
        origin: "*", // Configure CORS as needed
      },
    });

    io.on('connection', (socket) => {
      console.log('User connected');
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  }
};
