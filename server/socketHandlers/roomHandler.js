import roomList from "../models/roomList";
import Room from "../models/room";
const generateId = require("../utils");

function roomHandler(socket, io) {

  socket.on('ROOM_LIST', (data) => {
    const roominfo = roomList.getRoomListJSON();
    socket.emit('ROOM_LIST', roominfo);
  });

  socket.on('JOIN_ROOM', (roomId) => {
    if (!roomList.getRoom(roomId)) {
      sendFail(socket, 'Room does not exist');
      return;
    }
    if (roomList.getRoom(roomId).isFull()) {
      sendFail(socket, 'Room is full');
      return;
    }
    if (roomList.getRoom(roomId).hasUser(socket.userId)) {
      sendFail(socket, 'Already in room');
      return;
    }
    roomList.getRoom(roomId).newUser(socket.userId);
    sendSuccess(socket, roomId);
  });

  socket.on('CREATE_ROOM', (roomInfo) => {

    const req = JSON.parse(roomInfo);

    if (!(req && req.name && req.maxPlayers)) {
      sendFail(socket, 'Missing or invalid room info');
      return;
    }

    const roomId = generateId(8);
    const success = roomList.addRoom(roomId, new Room(roomId, req.name, socket.userId, req.maxPlayers));

    if (success) {
      sendSuccess(socket, roomId);
    } else {
      sendFail(socket, 'Failed to create room');
    }
  });

}

function sendSuccess(socket, roomId) {
  socket.emit('ROOM_OP_SUCCESS', roomId);
}

function sendFail(socket, err) {
  socket.emit('ROOM_OP_FAIL', err);
}

module.exports = roomHandler;