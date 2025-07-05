const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = require('http').createServer(app);

const io = socketIO(server, {
  cors: { origin: "*" }
});

// Track farmers in chat
const farmers = {};

io.on('connection', (socket) => {
  console.log('New farmer connected');

  // Join chat
  socket.on('join', (name) => {
    farmers[socket.id] = name;
    socket.broadcast.emit('message', `${name} joined the chat`);
  });

  // Send message
  socket.on('sendMessage', (msg) => {
    io.emit('message', `${farmers[socket.id]}: ${msg}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    io.emit('message', `${farmers[socket.id]} left the chat`);
    delete farmers[socket.id];
  });
});

server.listen(3000, () => console.log('Chat server running on port 3000'));
