import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import crypto from 'crypto';

// socket event handlers
import chatHandler from "./socketHandlers/chatHandler";
import gameHandler from "./socketHandlers/gameHandler";
import roomHandler from "./socketHandlers/roomHandler";

// user models
import User from "./models/user";
import userList from "./models/userList";


// defining event types
interface ServerToClientEvents {
  connect_success: () => void;
  ROOM_LIST: (roomList: string) => void;
  ROOM_OP_SUCCESS: (roomId: string) => void;
  ROOM_OP_FAIL: (err_msg: string) => void;
}
interface ClientToServerEvents {
  ROOM_LIST: () => void;
  JOIN_ROOM: (roomId: string) => void;
  CREATE_ROOM: (roomInfo: string) => void;
}
interface SocketData {
  username: string;
  userId: string;
}




// initialising server
const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, SocketData>(server, {
   cors: {
      origin: '*'
   }
});






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
  socket.data.username = username;
  next();
});

// socket.io event listeners
io.on('connection', (socket) => {

  // catch all listener for debugging
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  // set up handlers for app events
  chatHandler(socket);
  gameHandler(socket);
  roomHandler(socket);

  // disconnect handler
  socket.on('disconnect', () => {
    // TODO: implement disconnect logic
  });

  // set up user
  socket.data.userId = crypto.randomUUID();
  userList.addUser(socket.data.userId, new User(socket));

  // send success message to client
  socket.emit("connect_success");

});


