class User {

  socket;

  constructor(socket) {
    this.socket = socket;
    this.socket.data.roomId = null;
  }

  /**
   * Updates the roomId value in the socket data, and joins the socket.io room, with the name being the roomId.
   * @param {string} roomId
   */
  joinRoom(roomId) {
    this.socket.data.roomId = roomId;
    this.socket.join(roomId);
  }

  /**
   * Updates the roomId value in the socket data to null, and leaves the socket.io room
   */
  leaveRoom() {
    this.socket.leave(this.socket.data.roomId);
    this.socket.data.roomId = null;
  }

  getUsername() {
    return this.socket.username;
  }

}

export default User;
