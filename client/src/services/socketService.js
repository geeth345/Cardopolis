import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.ENDPOINT = 'http://localhost:3001';
    this.socket = io(this.ENDPOINT, { autoConnect: false });
    this.handleInvalidUsername = null;

    this._initSocketListeners();
  }

  _initSocketListeners() {
    // catch all listener for debugging
    this.socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    // handle connection errors from server
    this.socket.on("connect_error", (err) => {
      if (err.message === "USR_TAKEN") {
        if (this.handleInvalidUsername) {
          this.handleInvalidUsername();
        }
      }
    });
  }

  onInvalidUsername(cb) {
    this.handleInvalidUsername = cb;
  }

  connectServer(username) {
    this.socket.auth = { username };
    this.socket.connect();
  }

  joinRoomReq(roomId, username) {
    if (!this.socket.connected) {
      this.connectServer(username);
    }
  }

  createRoom(roomId, username) {
    if (roomId && username) {
      this.socket.emit('CREATE_ROOM', { roomId, username });
    }
  }

}

export const socketService = new SocketService();