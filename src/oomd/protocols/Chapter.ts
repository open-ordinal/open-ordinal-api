import { Linked } from "../Links";

/**
 * @category Protocols
 */
export interface Chapter {
	title?: string;
	description?: string;

	chapters?: Linked<Chapter>[]
}