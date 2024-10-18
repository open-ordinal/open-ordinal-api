import { getInscription, getSatAt, getMetadata, getChildrenAll, getParentsAll, OOMD, getLatestId, cached } from '../OOAPI.js';

import { Artist } from "./Artist.js";
import { Release } from "./Release.js";

import { getDecoder, encodeWAV } from "./codec.js";

import { Link } from "@open-ordinal/metadata";

export class Track {
	// Static method to load a track, using a cached version of the _load method
	static load = cached(Track._load);

	// Private static method to load a track by its ID
	static async _load(_id: string): Promise<Track> {
		let track = new Track();
		track._loaded = false;

		// Get the latest ID for the track
		track.id = await getLatestId(_id);

		// Fetch metadata for the track
		let metadata = await getMetadata(track.id);

		// Ensure metadata is in the correct format
		let tm = typeof (metadata?.track) === "object" ? metadata.track : metadata as OOMD.Track;
		track.mm = typeof (metadata?.media) === "object" ? metadata.media : metadata as OOMD.Media;

		// Assign duration and title from metadata
		track.duration = track.mm?.duration ?? 0;
		track.title = tm?.title ?? `<${track.id}>`;

		// Process release information
		const release = tm?.releases && tm.releases[0]; // TODO: should be array?
		if (release) {
			if (typeof release === "string") {
				// If release is a string, create a new Release instance
				const rel = new Release();
				rel.title = release;
				track.release = rel;
			} else {
				// If release is an object, load or create a new Release instance
				const id = "@id" in release && release["@id"];
				if (id) {
					const rel = await Release.load(id);
					track.release = rel;
				} else {
					const rel = new Release();
					Object.assign(rel, release);
					track.release = rel;
				}
			}
		} else {
			// If no release in metadata, fetch parent releases
			const parents = await getParentsAll(track.id);
			track.release = await Release.load(parents[0]);
		}

		// Process artists information
		const artists = tm?.artists;
		if (artists) {
			for (var artist of artists) {
				if (typeof artist === "string") {
					// If artist is a string, create a new Artist instance
					const art = new Artist();
					art.name = artist;
					track.artists.push(art);
				} else {
					// If artist is an object, load or create a new Artist instance
					const id = "@id" in artist && artist["@id"];
					if (id) {
						const art = await Artist.load(id);
						track.artists.push(art);
					} else {
						const art = new Artist();
						Object.assign(art, artist);
						track.artists.push(art);
					}
				}
			}
		} else {
			// If no artists in metadata, use artists from the release
			track.artists = track.release.artists;
		}

		return track;
	}

	// Title of the track
	title: string = "";

	// Array to hold artist information
	artists: Artist[] = [];

	// Release information for the track
	release: Release = new Release();

	// Method to load data for the track
	async loadData(): Promise<Track> {
		// If data is already loaded, return the track
		if (this._loaded) { return this; }

		// Check if a decoder is available
		let decoder = this.mm.decoder;
		if ((decoder && "@id" in decoder)) {
			// Fetch and decode the audio data
			const decode = await getDecoder(decoder["@id"]);
			const encodedData = await fetch(`/content/${this.id}`);
			const decodedData = await decode(await encodedData.arrayBuffer(), this.mm);
			if (decodedData.audioBuffer) {
				// Encode the decoded audio data to WAV format
				const wavData = encodeWAV(await decodedData.audioBuffer());
				const blob = new Blob([wavData], { type: "audio/wav" });
				// Create a URL for the audio blob
				this.audioURL = URL.createObjectURL(blob);
			}
		} else if ((decoder && "@sat" in decoder)) {
			// TODO: This.
		} else {
			// If no decoder, use the raw audio URL
			const url = `/content/${this.id}`;
			const audio = new Audio(url);
			// Wait for the audio metadata to load
			await new Promise<void>((resolve, reject) => { audio.onloadedmetadata = () => resolve(); });
			// Set the duration and audio URL
			this.duration = audio.duration;
			this.audioURL = url;
		}

		// Mark data as loaded
		this._loaded = true;
		return this;
	}

	// Duration of the track in seconds
	duration: number = 0.0;

	// URL for the audio file
	audioURL: string = "";

	// Flag to indicate if data is loaded
	_loaded: boolean = true;

	// Optional property for the track ID
	id?: string;

	// Media metadata for the track
	mm: OOMD.Media = {};
};

