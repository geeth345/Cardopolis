interface Entity {
    id: number;
    pos: { x: number, y: number };
    type: string;
    data: { [key: string]: any };
}

export type { Entity };

