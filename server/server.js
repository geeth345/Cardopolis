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

});

const port = 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));