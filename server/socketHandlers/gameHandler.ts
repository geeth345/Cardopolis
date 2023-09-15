import roomList from "../state/roomList";
import Game from "../models/game";
import {Entity} from "../interfaces/entity.interface";



function gameHandler(socket, io) {

    socket.on('USR_UPDATE', (update) =>
    {
        let game = getCurrentGame(socket);
        if (!game) {
            return;
        }

        // TODO: validate update

        if (game.doUpdate(update)) {
            sendSuccess(socket, update.updateId);
            socket.to(socket.data.roomId).emit('UPDATE', update);
        }

    });

}

function sendSuccess(socket, updateId) {
    socket.emit("UPDATE_SUCCESS", updateId);
}

function sendFail(socket, updateId, err) {
    socket.emit("UPDATE_FAIL", updateId, err);
}


function getCurrentGame(socket) : Game | null {
    let room = roomList.getRoom(socket.data.roomId);
    if (room) {
        return room.getGame();
    }
    return null;
}

export default gameHandler;