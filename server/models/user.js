export class User {

  socket;
  roomId;

  constructor(socket) {
    this.socket = socket
    this.roomId = null;
  }

  joinRoom(roomId) {
    this.roomId = roomId;
    this.socket.join(roomId);
  }

  leaveRoom() {
    this.roomId = null;
    this.socket.leave(this.roomId);
  }

  getSocket() {
    return this.socket;
  }

}
