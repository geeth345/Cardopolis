import Room from './room.js';

class RoomList {

  rooms: Map<string, Room>;

  constructor() {
    // rooms stores in a map with roomId as key and room object as value
    this.rooms = new Map();

    // TODO: remove mock data
    this.rooms.set('room1', new Room('room1', 'room1', 'user1', 4));
    this.rooms.set('room2', new Room('room2', 'room2', 'user2', 8));
    this.rooms.set('room3', new Room('room3', 'room3', 'user3', 10));
    this.rooms.set('room4', new Room('room4', 'room4', 'user4', 5));

  }

  addRoom(roomId, room) {
    if (this.rooms.has(roomId)) {
      return false;
    }
    this.rooms.set(roomId, room);
    return true;
  }

  removeRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      return false;
    }
    if (this.rooms.get(roomId).numUsers() > 0) {
      return false;
    }
    this.rooms.delete(roomId);
  }

  getRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      return null;
    }
    return this.rooms.get(roomId);
  }

  getRoomListJSON() {
    const rs = [];
    for (const [_, room] of this.rooms) {
      rs.push(room.getRoomInfo());
    }
    return { rooms: rs };
  }

}

const roomList = new RoomList();

export default roomList;