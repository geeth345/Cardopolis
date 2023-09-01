export class User {

  socket;
  roomId;

  constructor(socket) {
    this.socket = socket
    this.roomId = null;
  }

  joinRoom(roomId) {
    this.roomId = roomId;
  }

  leaveRoom() {
    this.roomId = null;
  }

  getSocket() {
    return this.socket;
  }

}
