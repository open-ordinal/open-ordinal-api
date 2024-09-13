import { getInscription, getSatAt, getMetadata, getChildrenAll, getParentsAll, OOMD, getLatestId, cached } from '../OOAPI';

import { Artist } from "./Artist";
import { Release } from "./Release";

import { getDecoder, encodeWAV } from "./codec";

export class Track {
	static load = cached(Track._load);
	static async _load(_id: string) : Promise<Track> {
		let track = new Track();
		track._loaded = false;

		track.id = await getLatestId(_id);

		let metadata = await getMetadata(track.id);

		let tm = typeof( metadata?.track ) === "object" ? metadata.track : metadata as OOMD.Track;
		track.mm = typeof( metadata?.media ) === "object" ? metadata.media : metadata as OOMD.Media;

		track.duration = track.mm?.duration ?? 0;

		track.title = tm?.title ?? `<${track.id}>`;

		const release = tm?.releases && tm.releases[0]; // TODO: should be array?
		if(release){
			if(typeof release === "string"){
				const rel = new Release();
				rel.title = release;
				track.release = rel;
			}else{
				const id = "@id" in release && release["@id"];
				if(id){
					const rel = await Release.load(id);
					track.release = rel;
				}else{
					const rel = new Release();
					Object.assign(rel, release);
					track.release = rel;
				}
			}
		}else{
			const parents = await getParentsAll(track.id);
			track.release = await Release.load(parents[0]);
		}

		const artists = tm?.artists;
		if(artists){
			for(var artist of artists) {
				if( typeof(artist) === "string" ){
					const art = new Artist();
					art.name = artist;
					track.artists.push(art);
				}else{
					const id = "@id" in artist && artist["@id"];
					if(id){
						const art = await Artist.load(id);
						track.artists.push(art);
					}else{
						const art = new Artist();
						Object.assign(art, artist);
						track.artists.push(art);
					}
				}
			}
		}else{
			track.artists = track.release.artists;
		}
		
		return track;
	}

	title: string = "";
	artists: Artist[] = [];
	release: Release = new Release();

	async loadData(): Promise<Track> {
		if(this._loaded) { return this; }

		let decoder = this.mm.decoder?.["@id"];
		if( decoder ){
			const decode = await getDecoder(decoder);
			const encodedData = await fetch(`/content/${this.id}`);
			const decodedData = await decode(await encodedData.arrayBuffer(), this.mm);
			if(decodedData.audioBuffer){
				const wavData = encodeWAV(await decodedData.audioBuffer());
				const blob = new Blob([wavData], { type: "audio/wav" });
				//if(decodedData.duration){
				//	this.duration = decodedData.duration;
				//}
				this.audioURL = URL.createObjectURL(blob);
			}
		} else {
			const url = `/content/${this.id}`;
			const audio = new Audio(url);
			await new Promise<void>((resolve, reject) => { audio.onloadedmetadata = () => resolve(); });
			this.duration = audio.duration;
			this.audioURL = url;
		}

		this._loaded = true;
		return this;
	}

	duration: number = 0.0;
	audioURL: string = "";

	_loaded: boolean = true;
	id?: string;
	mm: OOMD.Media = {};
};

