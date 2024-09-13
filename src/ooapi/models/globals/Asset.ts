/**
 * Asset Class
 * Assets an Ordinal exposes to be used by externals e.g. Sprites, 
 */

import { OrdinalType } from '../base/Ordinal';

/**
 * An Asset in the Open Ordinal API is a single asset the ordinal expose.
 * This can be a single image or different pars a image consists of.
 * If you expose multiple assets to compose a Composition eaach of these
 * are considered an Asset.
 * 
 * An Asset is defined when the ordinal want to expose them. One reason
 * to expose these is to give the user of an ordinal the option to bring
 * these to other platforms (i.e. games, remixing and other).
 */
export interface IAsset {
    id: string;
    type?: OrdinalType;
    name?: string;
    data?: (() => Promise<any/*Sprite | Track*/>) | string;
}

/**
 * An Asset in the Open Ordinal API is a single asset the ordinal expose.
 * This can be a single image or different pars a image consists of.
 * If you expose multiple assets to compose a Composition eaach of these
 * are considered an Asset.
 * 
 * An Asset is defined when the ordinal want to expose them. One reason
 * to expose these is to give the user of an ordinal the option to bring
 * these to other platforms (i.e. games, remixing and other).
 */
export class Asset {
    id?: string;
    type?: OrdinalType;
    name?: string;
    data?: () => Promise<any | string>;

    constructor(options: IAsset) {
        this.id = options.id;
        this.type = options.type;
        this.name = options.name;
        if (typeof options.data === "string") {
            this.data = async () => options.data as string;
        } else {
            this.data = options.data;
        }
    }

    getType(): OrdinalType | undefined {
        return this.type;
    }

    getName(): string | undefined {
        return this.name;
    }

    getId(): string | undefined {
        return this.id;
    }

    async getData(): Promise<any> {
        if (this.data) {
            return await this.data();
        }
        return null;
    }
}
