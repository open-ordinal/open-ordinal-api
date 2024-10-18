import { getMetadata, getChildrenAll, OOMD, getLatestId, cached } from "../OOAPI.js"

import { Release } from "./Release.js";

/**
 * Represents an artist and provides methods to load and manage artist data.
 */
export class Artist {
    // Static method to load an artist, cached to avoid redundant calls
    static load = cached(Artist._load);

    /**
     * Loads an artist by ID.
     * @param {string} _id - The ID of the artist to load.
     * @returns {Promise<Artist>} - A promise that resolves to the loaded artist.
     */
    static async _load(_id: string): Promise<Artist> {
        const artist = new Artist();
        artist._loaded = false;

        // Get the latest ID for the artist
        artist.id = await getLatestId(_id);

        // Fetch and assign metadata for the artist
        let metadata = await getMetadata(artist.id);
        artist.md = typeof (metadata?.artist) === "object" ? metadata.artist : metadata as OOMD.Artist;

        // Set the artist's name or default to the ID if name is not available
        artist.name = artist.md?.name ?? `<${artist.id}>`;

        return artist;
    }

    name: string = ""; // The name of the artist

    /**
     * Loads additional data for the artist, including releases.
     * @returns {Promise<Artist>} - A promise that resolves to the artist with loaded data.
     */
    async loadData(): Promise<Artist> {
        if (this._loaded) { return this; }

        let releases = this.md?.releases;
        if (releases) {
            // Load releases from metadata
            for (var release of releases) {
                const id = "@id" in release && release["@id"];
                if (id) {
                    const rel = await Release.load(id);
                    this.releases.push(rel);
                } else {
                    const rel = new Release();
                    Object.assign(rel, release);
                    if (rel.artists.length == 0) {
                        rel.artists.push(this); // Add this artist to the release if no artists are listed
                    }
                    this.releases.push(rel);
                }
            }
        } else {
            // Load releases by fetching children IDs
            for (var id of await getChildrenAll(this.id)) {
                const rel = await Release.load(id);
                this.releases.push(rel);
            }
        }

        this._loaded = true;
        return this;
    }

    /**
     * Gets the types of releases associated with the artist.
     * @returns {string[]} - An array of release types.
     */
    get releaseTypes() {
        const types: { [type: string]: any } = {};
        for (const release of this.releases) {
            types[release.type] = true;
        }
        return Object.keys(types);
    }

    /**
     * Gets the total duration of all tracks by the artist.
     * @returns {number} - The total duration of all tracks.
     */
    get duration() {
        var totalDuration = 0;
        for (var track of this.tracks) {
            totalDuration += track.duration;
        }
        return totalDuration;
    }

    /**
     * Gets all tracks by the artist.
     * @returns {Track[]} - An array of tracks.
     */
    get tracks() {
        return this.releases.flatMap(r => r.tracks);
    }

    releases: Release[] = []; // An array to store the artist's releases
    _loaded: boolean = true; // Flag to indicate if the artist data is loaded
    md?: OOMD.Artist; // Metadata for the artist
    id?: string; // The ID of the artist
};
