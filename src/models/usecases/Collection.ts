/**
 * Collection Class
 */

/**
 * A Collection is usually defined as a ordinal collection. This class
 * expose the trais that are available for the Collection.
 */
export interface ICollection {
    id: string;
    name?: string;
    description?: string;
    collectionTraits?: ICollectionTrait[];
}

/**
 * A Collection is usually defined as a ordinal collection. This class
 * expose the trais that are available for the Collection.
 */
export class Collection {
    id: string;
    name?: string;
    description?: string;
    collectionTraits: CollectionTrait[] = [];

    constructor(options: ICollection) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.collectionTraits = (options.collectionTraits || []).map(trait => new CollectionTrait(trait));
    }

    addTraitCategory(category: ICollectionTrait) {
        this.collectionTraits.push(new CollectionTrait(category));
    }
}

/**
 * A CollectionTrait is the specific traits available for a Collection.
 */
export interface ICollectionTrait {
    id: string;
    name: string;
    traitNames: string[];
}

/**
 * A CollectionTrait is the specific traits available for a Collection.
 */
export class CollectionTrait {
    id: string;
    name: string;
    traitNames: string[];

    constructor(options: ICollectionTrait) {
        this.id = options.id;
        this.name = options.name;
        this.traitNames = options.traitNames;
    }
}
