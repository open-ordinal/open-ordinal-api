/*!
 * Open Ordinal Metadata
 *
 * @author   Open Ordinal <https://openordinal.dev>
 * @license  MIT
 */
/**
 * @module OOMD
 */

import { Common } from "./protocols/Common"
import { Organization } from "./protocols/Organization"
import { Collection } from "./protocols/Collection"
import { Attributes } from "./protocols/Attributes"
import { Artist } from "./protocols/Artist"
import { Release } from "./protocols/Release"
import { Track } from "./protocols/Track"
import { Media } from "./protocols/Media"
import { Author } from "./protocols/Author"
import { Book } from "./protocols/Book"
import { Chapter } from "./protocols/Chapter"
import { Module } from "./protocols/Module"

export { Common } from "./protocols/Common"
export { Organization } from "./protocols/Organization"
export { Collection } from "./protocols/Collection"
export { Attributes } from "./protocols/Attributes"
export { Artist } from "./protocols/Artist"
export { Release } from "./protocols/Release"
export { Track } from "./protocols/Track"
export { Media } from "./protocols/Media"
export { Author } from "./protocols/Author"
export { Book } from "./protocols/Book"
export { Chapter } from "./protocols/Chapter"
export { Module } from "./protocols/Module"
export { Link, Linked, LinkedModule, LinkedVisual } from "./Links"

/**
 * @category Root
 * @mermaid OOMD Structure
 * graph LR
 *   OOMD --> Organization
 *   OOMD --> Collection
 *   Collection --> Attributes
 *   OOMD --> Attributes
 *   OOMD --> Artist
 *   Artist --> Release
 *   Release --> Track
 *   OOMD --> Media
 *   OOMD --> Author
 *   Author --> Book
 *   Book --> Chapter
 *   OOMD --> Module
 */
export interface Metadata extends Common {
	static?: true;	          // when present this indicates that a viewer should _not_ get the latest inscription on the sat number of this inscription

	organization?: Organization;

	collection?: Collection;  // when present this inscription is said to implement the Collection protocol
	attributes?: Attributes;  // when present this inscription is said to implement the Attributes protocol

	artist?: Artist;          // when present this inscription is said to implement the Artist protocol
	release?: Release;		  // when present this inscription is said to implement the Release protocol
	track?: Track;            // when present this inscription is said to implement the Track protocol

	media?: Media;            // when present this inscription is said to implement the Media protocol
	module?: Module;

	author?: Author;
	book?: Book;
	chapter?: Chapter;
}