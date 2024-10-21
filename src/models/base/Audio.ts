/**
 * Audio Class
 */

export enum AudioType {
    Album = 'Album',
    Artist = 'Artist',
    Track = 'Track',
}

export interface IAudio {
    url?: string;
    type?: AudioType;
}

export class Audio {
    url?: string;
    type?: AudioType;

    constructor(audioData: IAudio = {}) {
        this.url = audioData.url;
        this.type = audioData.type;
    }

    getUrl(): string | undefined {
        return this.url;
    }

    getType(): AudioType | undefined {
        return this.type;
    }
}
