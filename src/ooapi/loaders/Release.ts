import { getInscription, getMetadata, getChildrenAll, getParentsAll, OOMD, getLatestId, cached } from '../OOAPI';

import { Artist } from "./Artist";
import { Track } from "./Track";

export class Release {
	static fallbackCover: string = "";

	static load = cached(Release._load);
	static async _load(_id: string): Promise<Release> {
		const release = new Release();
		release._loaded = false;

		release.id = await getLatestId(_id);
		let metadata = await getMetadata(release.id);
		let md = typeof( metadata?.release) === "object" ? metadata.release : metadata as OOMD.Release;

		release._tracks = md.tracks;
		release.title = md.title ?? `<${release.id}>`;
		release.type = md.type ?? "collection";

		const artists = md.artists;
		if(artists){
			for(let artist of artists){
				if( typeof artist === "string" ){
					const art = new Artist();
					art.name = artist;
					release.artists.push(art);
				}else{
					const id = "@id" in artist && artist["@id"];
					if(id){
						const art = await Artist.load(id);
						release.artists.push(art);
					}else{
						const art = new Artist();
						Object.assign(art, artist);
						release.artists.push(art);
					}	
				}
			}
		}else{
			const parents = await getParentsAll(release.id);
			for(let id of parents){
				const art = await Artist.load(id);
				release.artists.push(art);				
			}
		}


		const inscription = await getInscription(release.id);
		release.date = new Date(md.date ?? (inscription.timestamp ?? 0) * 1000 );
		release.coverURL = md.cover && "@id" in md.cover? `/content/${md.cover["@id"]}` : Release.fallbackCover;

		return release;
	}

	get artist(){
		return this.artists[0];
	}

	get year(){
		return this.date.getFullYear();
	}

	get duration() {
		var totalDuration = 0;
		for( var track of this.tracks ){
			totalDuration += track.duration;
		}
		return totalDuration;
	}

	id?: string;

	title: string = "";
	type: string = "";
	date: Date = new Date();

	artists: Artist[] = [];

	coverURL: string = "";

	async loadData() : Promise<Release> {
		if(this._loaded) { return this; }

		const tracks = this._tracks;
		if(tracks){
			for(let track of tracks){
				const id = "@id" in track && track["@id"];
				if(id){
					const tra = await Track.load(id);
					this.tracks.push(tra);
				}else{
					const tra = new Track();
					Object.assign(tra, track);
					this.tracks.push(tra);
				}
			}
		}else{
			const parents = await getChildrenAll(this.id);
			for(let id of parents){
				const tra = await Track.load(id);
				this.tracks.push(tra);				
			}
		}

		this._loaded = true;
		return this;
	}

	tracks: Track[] = [];

	_loaded: boolean = true;
	_tracks?: OOMD.Linked<OOMD.Track>[];
};