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

// socket event handlers
import {chatHandler} from "./socketHandler/chatHandler";
import {gameHandler} from "./socketHandler/gameHandler";
import {roomHandler} from "./socketHandler/roomHandler";

// user models
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

  // set up handlers for app events
  chatHandler(socket, io);
  gameHandler(socket, io);
  roomHandler(socket, io);

  // disconnect handler
  socket.on('disconnect', () => {
    // TODO: implement disconnect logic
  });

  // set up user
  socket.userId = crypto.randomUUID();
  userList.addUser(socket.userId, new User(socket));

  // send success message to client
  socket.emit("connect_success");

});


