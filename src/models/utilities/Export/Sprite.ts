import { Export, Exportable } from "../Export.js";

/*
 * Sprite Class
 */
export enum SpriteType
{
    GridByCell = 'gridbycell'
}

export class SpriteAnimation {
    name: string;
    frames: { t: number, spriteNo: number }[];
    loop: boolean;

    constructor(data: {name: string, frames: { t: number, spriteNo: number }[], loop?: boolean} ) {
        this.name = data.name;
        this.frames = data.frames;
        this.loop = data.loop ?? true;
    }
}

export interface ISprite {
    rows: number;
    cells: number;
    offset?: { x: number, y: number };
    padding?: { x: number, y: number };
    sourceExport: () => Promise<Export>;
    actions: SpriteAnimation[];
}

export class Sprite {
    rows: number = 1;
    cells: number = 1;
    offset: { x: number; y: number; } = { x: 0, y: 0 };
    padding: { x: number; y: number; } = { x: 0, y: 0 };
    source: Exportable;
    type: SpriteType = SpriteType.GridByCell;
    actions: SpriteAnimation[];

    constructor(spriteData: ISprite) {
        this.rows = spriteData.rows;
        this.cells = spriteData.cells;
        this.offset = spriteData.offset ?? this.offset;
        this.padding = spriteData.padding ?? this.padding;
        this.source = new Exportable(spriteData.sourceExport);
        this.actions = spriteData.actions;
    };
}
