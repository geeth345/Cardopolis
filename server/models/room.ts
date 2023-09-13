import userList from "./userList";
import Game from "./game";

class Room {

  // room properties
  id: string;
  users: string[] = [];
  name: string;
  capacity: number;
  host: string;
  gameState: Game;

  constructor(id, name, host, capacity) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.host = host;
    this.users.push(host);
    this.gameState = new Game(id);
  }

  newUser(userId) {
    this.users.push(userId);
    userList.getUser(userId).joinRoom(this.id);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user !== userId);
    if (this.users.length > 0) {
      this.host = this.users[0];
    } else {
      this.host = null;
    }
    userList.getUser(userId).leaveRoom();
  }

  numUsers() {
    return this.users.length;
  }

  getRoomInfo() {
    const host = userList.getUser(this.host);
    let hostName = null;
    if (host) {
       hostName = host.getUsername();
    }

    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      numUsers: this.users.length,
      host: hostName,
    }
  }

  getGame() {
    return this.gameState;
  }

  isFull() {
    return this.users.length >= this.capacity;
  }

  hasUser(userId) {
    return this.users.includes(userId);
  }

}

export default Room;