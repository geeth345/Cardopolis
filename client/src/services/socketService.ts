import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.ENDPOINT = 'http://localhost:3001';
    this.socket = io(this.ENDPOINT, { autoConnect: false });

    this.handleInvalidUsername = null;
    this.handleConnectionSuccess = null;
    this.handleRoomListUpdate = null;
    this.handleRoomOpSuccess = null;

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

    // room list update
    this.socket.on("ROOM_LIST", (roomList) => {
      this.handleRoomListUpdate(roomList);
    });

    // room create / join
    this.socket.on("ROOM_OP_SUCCESS", (roomId) => {
      this.handleRoomOpSuccess(roomId);
    });
    this.socket.on("ROOM_OP_FAIL", (err) => {
      this.handleRoomOpFail(err);
    });
  }


  // ########## event listeners ##########

  onInvalidUsername(cb) {
    this.handleInvalidUsername = cb;
  }
  onConnectionSuccess(cb) {
    this.handleConnectionSuccess = cb;
  }

// room joining / creating
  onRoomListUpdate(cb) {
    this.handleRoomListUpdate = cb;
  }
  onRoomOpSuccess(cb) {
    this.handleRoomOpSuccess = cb;
  }
  onRoomOpFail(cb) {
    this.handleRoomOpFail = cb;
  }



  // ########## emit events ###############

  connectServer(username) {
    this.socket.auth = { username };
    this.socket.connect();
  }
  isConnected() {
    return this.socket.connected;
  }

  // room operations
  requestRoomList() {
    this.socket.emit("ROOM_LIST");
  }
  joinRoomRequest(roomId) {
    this.socket.emit("JOIN_ROOM", roomId);
  }
  createRoomRequest(roomName, capacity) {
    console.log(roomName, capacity);
    const req = JSON.stringify({ name: roomName, maxPlayers: capacity } );
    this.socket.emit("CREATE_ROOM", req);
  }


}

export const socketService = new SocketService();