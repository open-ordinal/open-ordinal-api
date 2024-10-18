import { getInscription, getMetadata, getChildrenAll, getParentsAll, OOMD, getLatestId, cached } from '../OOAPI.js';

import { Artist } from "./Artist.js";
import { Track } from "./Track.js";

export class Release {
	// Static property to hold the fallback cover URL
	static fallbackCover: string = "";

	// Static method to load a release, using a cached version of the _load method
	static load = cached(Release._load);

	// Private static method to load a release by its ID
	static async _load(_id: string): Promise<Release> {
		const release = new Release();
		release._loaded = false;

		// Get the latest ID for the release
		release.id = await getLatestId(_id);
		// Fetch metadata for the release
		let metadata = await getMetadata(release.id);
		// Ensure metadata is in the correct format
		let md = typeof (metadata?.release) === "object" ? metadata.release : metadata as OOMD.Release;

		// Assign tracks and other properties from metadata
		release._tracks = md.tracks;
		release.title = md.title ?? `<${release.id}>`;
		release.type = md.type ?? "collection";

		// Process artists information
		const artists = md.artists;
		if (artists) {
			for (let artist of artists) {
				if (typeof artist === "string") {
					// If artist is a string, create a new Artist instance
					const art = new Artist();
					art.name = artist;
					release.artists.push(art);
				} else {
					// If artist is an object, load or create a new Artist instance
					const id = "@id" in artist && artist["@id"];
					if (id) {
						const art = await Artist.load(id);
						release.artists.push(art);
					} else {
						const art = new Artist();
						Object.assign(art, artist);
						release.artists.push(art);
					}
				}
			}
		} else {
			// If no artists in metadata, fetch parent artists
			const parents = await getParentsAll(release.id);
			for (let id of parents) {
				const art = await Artist.load(id);
				release.artists.push(art);
			}
		}

		// Fetch inscription and set release date and cover URL
		const inscription = await getInscription(release.id);
		release.date = new Date(md.date ?? (inscription.timestamp ?? 0) * 1000);
		release.coverURL = md.cover && "@id" in md.cover ? `/content/${md.cover["@id"]}` : Release.fallbackCover;

		return release;
	}

	// Getter for the primary artist
	get artist() {
		return this.artists[0];
	}

	// Getter for the release year
	get year() {
		return this.date.getFullYear();
	}

	// Getter for the total duration of all tracks
	get duration() {
		var totalDuration = 0;
		for (var track of this.tracks) {
			totalDuration += track.duration;
		}
		return totalDuration;
	}

	// Optional property for the release ID
	id?: string;

	// Title of the release
	title: string = "";

	// Type of the release (e.g., album, single, etc.)
	type: string = "";

	// Release date
	date: Date = new Date();

	// Array to hold artist information
	artists: Artist[] = [];

	// URL for the cover image
	coverURL: string = "";

	// Method to load data for the release
	async loadData(): Promise<Release> {
		// If data is already loaded, return the release
		if (this._loaded) { return this; }

		// Process tracks information
		const tracks = this._tracks;
		if (tracks) {
			for (let track of tracks) {
				const id = "@id" in track && track["@id"];
				if (id) {
					// Load track by ID
					const tra = await Track.load(id);
					this.tracks.push(tra);
				} else {
					// Create a new Track instance and assign properties
					const tra = new Track();
					Object.assign(tra, track);
					this.tracks.push(tra);
				}
			}
		} else {
			// If no tracks in metadata, fetch child tracks
			const parents = await getChildrenAll(this.id);
			for (let id of parents) {
				const tra = await Track.load(id);
				this.tracks.push(tra);
			}
		}

		// Mark data as loaded
		this._loaded = true;
		return this;
	}

	// Array to hold track information
	tracks: Track[] = [];

	// Flag to indicate if data is loaded
	_loaded: boolean = true;

	// Optional property for linked tracks in metadata
	_tracks?: OOMD.Linked<OOMD.Track>[];
};