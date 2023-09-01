const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
   cors: {
      origin: '*'
   }
});

// import handlers
import {chatHandler} from "./socketHandler/chatHandler";
import {gameHandler} from "./socketHandler/gameHandler";
import {roomHandler} from "./socketHandler/roomHandler";

// import models
import {User} from "./models/user";
import {userList} from "./models/userList";


// start server
const port = 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));


// middleware for user validation
io.use((socket, next) => {
  // existing sessions (client sends session id)
  // TODO: implement session persistence

  // new sessions (client sends username)
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("USR_INVALID"));
  }
  socket.username = username;
  next();
});


// socket.io event listeners
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.userId = crypto.randomUUID();
  userList.addUser(socket.userId, new User(socket));
  socket.emit("connect_success");

  socket.on('disconnect', () => {
    // TODO: implement disconnect logic
  });

  // Delegate to handlers
  chatHandler(socket, io);
  gameHandler(socket, io);
  roomHandler(socket, io);


});


