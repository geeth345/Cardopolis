import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.ENDPOINT = 'http://localhost:3001';
    this.socket = io(this.ENDPOINT, { autoConnect: false });

    this.handleInvalidUsername = null;
    this.handleConnectionSuccess = null;

    this._initSocketListeners();
  }

  // initialize socket listeners
  _initSocketListeners() {
    // catch all listener for debugging
    this.socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    // connection errors from server
    this.socket.on("connect_error", (err) => {
      if (err.message === "USR_INVALID") {
        if (this.handleInvalidUsername) {
          this.handleInvalidUsername();
        }
      }
    });

    // successful connection to server
    this.socket.on("connect_success", () => {
      this.handleConnectionSuccess();
    });
  }


  // ########## event listeners ##########

  onInvalidUsername(cb) {
    this.handleInvalidUsername = cb;
  }
  onConnectionSuccess(cb) {
    this.handleConnectionSuccess = cb;
  }


  // ########## emit events ###############

  connectServer(username) {
    this.socket.auth = { username };
    this.socket.connect();
  }

  joinRoomReq(roomId, username) {

  }

  createRoom(roomId, username) {

  }

}

export const socketService = new SocketService();