
class RoomList {
  constructor() {
    // rooms stores in a map with roomId as key and room object as value
    this.rooms = new Map();
  }

  addRoom(roomId, room) {
    this.rooms.set(roomId, room);
  }


  removeRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      return false;
    }
    if (this.rooms.get(roomId).numPlayers() > 0) {
      return false;
    }
    this.rooms.delete(roomId);
  }

  getRoomListJSON() {
    const roomInfoArray = [];
    for (const [_, room] of this.rooms) {
      roomInfoArray.push(room.getRoomInfo());
    }
    return JSON.stringify(roomInfoArray);
  }

}

export const roomList = new RoomList();