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
const chatHandler = require("./socketHandlers/chatHandler.js");
const gameHandler = require("./socketHandlers/gameHandler.js");
const roomHandler = require("./socketHandlers/roomHandler.js");

// user models
const User = require("./models/user");
const userList = require("./models/userList");


// start server
const port = 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));



// middleware for user validation
io.use((socket, next) => {
  // existing sessions (client sends session id)
  // TODO: implement session persistence

  // new sessions (client sends username)
  const username = socket.handshake.auth.username;
  console.log("Connection attempt from " + username);
  if (!username) {
    return next(new Error("USR_INVALID"));
  }
  socket.username = username;
  next();
});

// socket.io event listeners
io.on('connection', (socket) => {

  // catch all listener for debugging
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

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


