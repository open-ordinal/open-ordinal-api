/**
 * Ordinal Class
 */

export enum OrdinalType {
    // Audio
    AUDIO = 'audio',
    // Video
    VIDEO = 'video',
    // Image
    IMAGE = 'image', // static or animated image
    // 3D
    MODEL = '3dmodel',
    // Pure Text
    TEXT = 'text',
    // Multi (Advanced - Can be multiple types)
    MULTI = 'multi', // .html -> Exposes multiple variants
}

export interface IOrdinal {
    id?: string;
    transactionStamp?: Date | null | undefined;
    info?: Record<string, any> | null | undefined;
    metaData?: Record<string, any> | null | undefined;
}

export class Ordinal {
    id?: string;
    transactionStamp?: Date | null | undefined;
    info?: Record<string, any> | null | undefined;
    metaData?: Record<string, any> | null | undefined;

    constructor(options: IOrdinal = {}) {
        this.id = options.id ?? '';
        this.transactionStamp = options.transactionStamp ?? null;
        this.info = options.info ?? null;
        this.metaData = options.metaData ?? null;
    }

    getId(): string | undefined {
        return this.id;
    }

    getTransactionStamp(): Date | null | undefined {
        return this.transactionStamp;
    }

    getInfo(): Record<string, any> | null | undefined {
        return this.info;
    }

    getMetaData(): Record<string, any> | null | undefined {
        return this.metaData;
    }
}
