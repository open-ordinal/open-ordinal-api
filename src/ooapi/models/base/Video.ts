/**
 * Video Class
 */

export interface IVideo {
    url?: string;
    duration?: number;
    format?: string;
    resolution?: string;
}

export class Video {
    url?: string;
    duration?: number;
    format?: string;
    resolution?: string;

    constructor(options: IVideo = {}) {
        this.url = options.url;
        this.duration = options.duration;
        this.format = options.format;
        this.resolution = options.resolution;
    }

    getUrl(): string | undefined {
        return this.url;
    }

    getDuration(): number | undefined {
        return this.duration;
    }

    getFormat(): string | undefined {
        return this.format;
    }

    getResolution(): string | undefined {
        return this.resolution;
    }
}
