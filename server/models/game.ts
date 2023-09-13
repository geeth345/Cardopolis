import Entity from "./entity";

class Game {

    // gameplay state
    entities: Entity[] = [];
    updateId: number = 0;

    // room id to send updates to
    roomId: string;

    constructor(roomId) {
        this.roomId = roomId;
    }



}

export default Game;