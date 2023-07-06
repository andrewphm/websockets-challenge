const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use('/', express.static('public'));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('stop typing', (user) => {
    socket.broadcast.emit('stop typing', user);
  });
});

server.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}/`);
});
