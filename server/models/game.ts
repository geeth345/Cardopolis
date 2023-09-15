import {Entity} from "../interfaces/entity.interface";
import {Update, UpdateEntity} from "../interfaces/update.interface";


class Game {

    // gameplay state
    entities: Map<number, Entity> = new Map<number, Entity>();
    updateId: number = 0;

    // room id to send updates to
    roomId: string;

    constructor(roomId) {
        this.roomId = roomId;
    }

    doUpdate(update: Update) : boolean {
        for (let change of update.changes) {
            switch (change.type) {
                case 'create':
                    this.createEntity(change.entity);
                    break;
                case 'update':
                    this.updateEntity(change);
                    break;
                case 'remove':
                    this.removeEntity(change.id);
                    break;
            }
        }
        return true;
    }

    createEntity(entity: Entity) {
        this.entities.set(entity.id, entity);
    }

    removeEntity(entityId: number) {
        this.entities.delete(entityId);
    }

    updateEntity(update: UpdateEntity) {
        let entity = this.entities.get(update.id);
        if (entity) {
            for (let key in update.newState) {
                entity[key] = update.newState[key];
            }
        }
    }


}

export default Game;