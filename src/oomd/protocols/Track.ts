import { Linked } from "../Links";

import { Artist } from "./Artist";
import { Release } from "./Release";

/**
 * @category Protocols
 */
export interface Track {
	title: string;

	releases?: (Linked<Release> | string)[]; // otherwise assumed to be any parent inscriptions implementing Release
	artists?: (Linked<Artist> | string)[]; // otherwise assumed to be any grand parent inscriptions implementing Artist
}
