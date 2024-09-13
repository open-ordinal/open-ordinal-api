import { Linked } from "../Links";

import { Author } from "./Author";
import { Chapter } from "./Chapter";

export type ISBN = string;

/**
 * @category Protocols
 */
export interface Book {
	title?: string;
	description?: string;

	authors?: (Linked<Author> | string)[];
	
	chapters: Linked<Chapter>[]; // default children

	isbn?: ISBN;
}