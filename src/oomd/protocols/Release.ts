import { Linked, LinkedVisual } from "../Links";

import { Artist } from "./Artist";
import { Track } from "./Track";

/**
 * @category Protocols
 */
export interface Release {
	type: "album" | "single" | "ep" | "compilation" | string;
	title: string;
	date?: Date;
	cover?: LinkedVisual;

	artists?:  (Linked<Artist> | string)[]; // otherwise assumed to be parent inscriptions implementing Artist
	tracks?: Linked<Track>[]; // otherwise assumed to be child inscriptions implementing Track
}