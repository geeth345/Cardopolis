const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
       origin: '*'
    }
});


// middleware for username validation
io.use((socket, next) => {
   const username = socket.handshake.auth.username;
   if (!username) {
      return next(new Error("USR_INVALID"));
   }
   socket.username = username;
   next();
});


io.on('connection', (socket) => {
   console.log('New client connected');

   socket.on('JOIN_ROOM', (data) => {
      console.log("Received JOIN_ROOM event");
      console.log(data)
   });

   socket.on('CREATE_ROOM', (data) => {
      console.log("Received CREATE_ROOM event");
      console.log(data);
   });

   // emit successfully connection event to client
   socket.emit("connect_success");
   console.log("Emitted connect_success event");
});

const port = 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));