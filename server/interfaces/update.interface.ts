import {Entity} from "./entity.interface";

interface CreateEntity {
    type: 'create';
    entity: Entity;
}
interface UpdateEntity<T = any> {
    type: 'update';
    id: number;
    prevState: T;
    newState: T;
}
interface RemoveEntity {
    type: 'remove';
    id: number;
}
interface Update {
    updateId: number;
    changes: (CreateEntity | UpdateEntity | RemoveEntity)[];
}

export { CreateEntity, UpdateEntity, RemoveEntity, Update };