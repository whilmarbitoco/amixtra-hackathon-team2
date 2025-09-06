const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const routeRooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoute', (routeKey) => {
    socket.join(routeKey);
    
    if (!routeRooms.has(routeKey)) {
      routeRooms.set(routeKey, new Set());
    }
    routeRooms.get(routeKey).add(socket.id);
    
    const userCount = routeRooms.get(routeKey).size;
    io.to(routeKey).emit('userCount', userCount);
    
    console.log(`User ${socket.id} joined route: ${routeKey}`);
  });

  socket.on('sendMessage', ({ route, message }) => {
    io.to(route).emit('message', message);
    console.log(`Message sent to route ${route}:`, message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from all route rooms
    for (const [routeKey, users] of routeRooms.entries()) {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        const userCount = users.size;
        io.to(routeKey).emit('userCount', userCount);
        
        if (users.size === 0) {
          routeRooms.delete(routeKey);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});