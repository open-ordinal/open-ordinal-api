/**
 * Image Class
 */

export interface IImage {
    url?: string;
    width?: number;
    height?: number;
    description?: string;
}

export class Image {
    url?: string;
    width?: number;
    height?: number;
    description?: string;

    constructor(options: IImage = {}) {
        this.url = options.url;
        this.width = options.width;
        this.height = options.height;
        this.description = options.description;
    }

    getUrl(): string | undefined {
        return this.url;
    }

    getWidth(): number | undefined {
        return this.width;
    }

    getHeight(): number | undefined {
        return this.height;
    }

    getDescription(): string | undefined {
        return this.description;
    }
}
