import { Linked } from "../Links";

import { Release } from "./Release";

/**
 * @category Protocols
 */
export interface Artist {
	name: string;
	description?: string;
	
	releases?: Linked<Release>[]; // otherwise assumed to be child inscriptions implementing Release
}

