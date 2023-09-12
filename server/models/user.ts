class User {

  socket;
  roomId;

  constructor(socket) {
    this.socket = socket
    this.roomId = null;
  }

  /**
   * Updates the roomId value in the User object, and joins the socket.io room, with the name being the roomId.
   * @param {string} roomId
   */
  joinRoom(roomId) {
    this.roomId = roomId;
    this.socket.join(roomId);
  }

  /**
   * Updates the roomId value in the User object to null, and leaves the socket.io room
   */
  leaveRoom() {
    this.roomId = null;
    this.socket.leave(this.roomId);
  }

  getUsername() {
    return this.socket.username;
  }

}

export default User;
