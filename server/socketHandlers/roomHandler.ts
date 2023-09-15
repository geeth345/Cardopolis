import roomList from "../state/roomList";
import Room from "../models/room";
import { generateId } from "../utils";
import {Socket} from "socket.io";

function roomHandler(socket: Socket) {

  socket.on('ROOM_LIST', () => {
    const roominfo = roomList.getRoomListJSON();
    socket.emit('ROOM_LIST', roominfo);
  });

  socket.on('JOIN_ROOM', (roomId) => {
    let room = roomList.getRoom(roomId);
    if (!room) {
      sendFail(socket, 'Room does not exist');
      return;
    }
    if (room.isFull()) {
      sendFail(socket, 'Room is full');
      return;
    }
    if (room.hasUser(socket.data.userId)) {
      sendFail(socket, 'Already in room');
      return;
    }
    room.newUser(socket.data.userId);
    sendSuccess(socket, roomId);
  });

  socket.on('CREATE_ROOM', (roomInfo) => {

    const req = JSON.parse(roomInfo);

    if (!(req && req.name && req.maxPlayers)) {
      sendFail(socket, 'Missing or invalid room info');
      return;
    }

    const roomId = generateId(8);
    const success = roomList.addRoom(roomId, new Room(roomId, req.name, socket.data.userId, req.maxPlayers));

    if (success) {
      sendSuccess(socket, roomId);
    } else {
      sendFail(socket, 'Failed to create room');
    }
  });

}

function sendSuccess(socket: Socket, roomId: string) {
  socket.emit('ROOM_OP_SUCCESS', roomId);
}

function sendFail(socket: Socket, err: string) {
  socket.emit('ROOM_OP_FAIL', err);
}

export default roomHandler;