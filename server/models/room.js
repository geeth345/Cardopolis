import { userList } from "./userList";

export class Room {

  id;
  users= [];
  name;
  capacity;
  host;

  constructor(id, name, host, capacity) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.host = host;

    this.users.push(host);

  }

  addUser(userId) {
    this.users.push(userId);
    userList.getUser(userId).joinRoom(this.id);
  }

  removeUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
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
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      numUsers: this.users.length,
      host: this.host
    }
  }


}