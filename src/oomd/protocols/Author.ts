import { Linked } from "../Links";

import { Book } from "./Book";

/**
 * @category Protocols
 */
export interface Author {
	name?: string;

	books?: Linked<Book>[];
}