import {io} from "socket.io-client";

const ENDPOINT = 'http://localhost:3001';
const socket = io(ENDPOINT);

const connect = (roomId, username) => {
  if (roomId && username) {
    socket.emit('JOIN_ROOM', {roomId, username});
  }
}

const createRoom = (roomId, username) => {
  if (roomId && username) {
    socket.emit('CREATE_ROOM', {roomId, username});
  }
}

export {
  connect,
  createRoom
}