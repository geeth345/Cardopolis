class Player {

  playerId;
  socketId;
  username;
  roomId;

  constructor(username) {
    this.username = username;
  }

  joinRoom(roomId) {
    this.roomId = roomId;
  }

}