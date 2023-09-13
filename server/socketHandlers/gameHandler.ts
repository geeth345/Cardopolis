import roomList from "../models/roomList";

function gameHandler(socket) {

}

function getCurrentGame(socket) {
    return roomList.getRoom(socket.data.roomId).getGame();
}

export default gameHandler;