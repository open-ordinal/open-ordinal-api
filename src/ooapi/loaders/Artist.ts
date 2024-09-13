import { getMetadata, getChildrenAll, OOMD, getLatestId, cached } from "../OOAPI"

import { Release } from "./Release";

export class Artist {
	static load = cached(Artist._load);
	static async _load(_id: string) : Promise<Artist> {
		const artist = new Artist();
		artist._loaded = false;

		artist.id = await getLatestId(_id);
		let metadata = await getMetadata(artist.id);
		artist.md = typeof( metadata?.artist) === "object" ? metadata.artist : metadata as OOMD.Artist;
		artist.name = artist.md?.name ?? `<${artist.id}>`;

		return artist;
	}

	name: string = "";

	async loadData() : Promise<Artist> {
		if( this._loaded ) { return this; }

		let releases = this.md?.releases;
		if(releases){
			for( var release of releases ){
				const id = "@id" in release && release["@id"];
				if(id){
					const rel = await Release.load(id);
					this.releases.push(rel);
				}else{
					const rel = new Release();
					Object.assign(rel, release);
					if(rel.artists.length == 0) {
						rel.artists.push(this); // TODO: not totally sure about this 
					}
					this.releases.push(rel);
				}
			}
		} else {
			for( var id of await getChildrenAll(this.id)){
				const rel = await Release.load(id);
				this.releases.push( rel );
			}
		}

		this._loaded = true;
		return this;
	}

	get releaseTypes(){
		const types : { [type:string]: any } = {};
		for(const release of this.releases){
			types[release.type] = true;
		}
		return Object.keys(types);
	}

	get duration() {
		var totalDuration = 0;
		for( var track of this.tracks ){
			totalDuration += track.duration;
		}
		return totalDuration;
	}

	get tracks() {
		return this.releases.flatMap(r => r.tracks);
	}

	releases: Release[] = [];

	_loaded: boolean = true;
	md?: OOMD.Artist;
	id?: string; 
};



