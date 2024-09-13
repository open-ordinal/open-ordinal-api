/*!
 * Open Ordinal API
 *
 * @author   Open Ordinal <https://openordinal.dev>
 * @license  MIT
 * @module   OOAPI
 */
/**
 * @module OOAPI
 */

//#region Imports and Exports

//Models - Base
import { IVariant, Variant } from './models/globals/Variant';
import { IComposition, Composition } from './models/globals/Composition';
import { IAsset, Asset } from './models/globals/Asset';
import { ITrait, Trait } from './models/globals/Trait';

export { IVariant, Variant } from './models/globals/Variant';
export { IComposition, Composition } from './models/globals/Composition';
export { IAsset, Asset } from './models/globals/Asset';
export { ITrait, Trait } from './models/globals/Trait';

//Models - Globals
import { IOrdinal, OrdinalType, Ordinal } from './models/base/Ordinal';
import { IAudio, Audio } from './models/base/Audio';
import { IImage, Image } from './models/base/Image';
import { IVideo, Video } from './models/base/Video';
import { ISprite, SpriteType, Sprite, SpriteAnimation } from './models/utilities/Export/Sprite'

export { IOrdinal, OrdinalType, Ordinal } from './models/base/Ordinal';
export { IAudio, Audio } from './models/base/Audio';
export { IImage, Image } from './models/base/Image';
export { IVideo, Video } from './models/base/Video';
export { ISprite, SpriteType, Sprite, SpriteAnimation } from './models/utilities/Export/Sprite'

//Models - Use Cases
import { ICollectionTrait, ICollection, Collection } from './models/usecases/Collection';

export { ICollectionTrait, ICollection, Collection } from './models/usecases/Collection';

// Helpers
import { loadScript } from './helpers/ScriptLoader';
import { AssetMap, KeyframeProps, Keyframe, AnimationTemplate, TemplateMap, AnimationManager } from './helpers/AnimationManager';

//OOMD Inports
import * as OOMD from '../oomd/OOMD';
export * as OOMD from '../oomd/OOMD';

// Loaders
export * from './loaders/Artist';
export * from './loaders/Release';
export * from './loaders/Track';

//Imported Third-Party Modules
import { decode } from 'cbor-x';
import { Buffer } from 'buffer';
import camelize from 'camelize-ts'
import { EventEmitter } from 'events';
import { Export, ExportType, getExportType } from './models/utilities/Export';

//#endregion

//#region Interfaces

declare global {
    interface Window {
        ooAPI?: any;
    }
}

//#endregion

//#region Privates

let _baseUrl = "";
let _id = "";
let _collections: Collection[] = [];
let _variants: Variant[] = [];
let _compositions: Composition[] = [];
let _assets: Asset[] = [];
let _traits: Trait[] = [];
let _events = new EventEmitter();
let _type: OrdinalType = OrdinalType.MULTI;
let _requestParams: Map<string, string> = new Map<string, string>();
let _ready = false;
let _metadata: OOMD.Metadata | undefined = {} as OOMD.Metadata;
let _currentVariant: Variant | undefined;
let _animationManager: AnimationManager | undefined;

//#endregion

//#region Core Functionality - General

/**
 * Set the internal stored Ordinal Id.
 * @category Core
 * @param {string} id Ordinal Id
 */
export function setId(id: string): void { _id = id; _metadata = undefined; _type = OrdinalType.MULTI; }

/**
 * Get the internal stored Ordinal Id.
 * @category Core
 * @returns {string} Ordinal Id
 */
export function getId(): string {
    if (_id == null || _id == "") {
        _id = getInscriptionIdFromUrl();
    }
    return _id;
}

/**
 * Set the internal stored Ordinal Type.
 * @category Core
 * @param {OrdinalType} type Ordinal Type
 */
export function setType(type: OrdinalType): void { _type = type; }

/**
 * Get the internal stored Ordinal Type.
 * @category Core
 * @returns {OrdinalType} Ordinal Type
 */
export function getType(): OrdinalType { return _type; }

/**
 * Set the internal stored Metadata.
 * @category Core
 * @param {OOMD.Metadata} metadata Ordinal Metadata
 */
export function setMetadata(metadata: OOMD.Metadata): void {
    _metadata = metadata;
}

/**
 * Get the url parameters of the iframe.
 * @category Core
 * @returns A Map of all url parameters and it's values.
 */
export function getRequestParams() { return _requestParams; }

//#endregion

//#region Core Functionality - Recursive

/**
 * Get the internal stored Metadata.
 * @category Core
 * @returns {Promise<OOMD.Metadata>} Ordinal Metadata
 */
export async function getMetadata(id: string): Promise<OOMD.Metadata> {
    if (_metadata == undefined || id != undefined) _metadata = await getInscriptionMetadata(id);
    return _metadata;
}

/**
 * Get the Inscription info.
 * @category Core
 * @param {str4ing} inscriptionId The inscription Id
 * @param {string} baseUrl Optional base URL
 * @returns {Promise<any>} The Inscrption info
 */
export async function getInscription(inscriptionId = getId(), baseUrl = _baseUrl): Promise<any> {
    try {
        const response = await fetch(`${baseUrl}/r/inscription/${inscriptionId}`);
        if (!response.ok) {
            return null;
        }
        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches metadata information.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @category Core
 * @param {string} inscriptionId - Inscription to get metadata.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} baseUrl - Optional baseUrl
 * @returns {Promise<{OOMD.Metadata}>} A promise that resolves with the processed metadata or null if the metadata was not found.
 */
async function getInscriptionMetadata(inscriptionId = getId(), baseUrl = _baseUrl): Promise<OOMD.Metadata> {
    const response = await fetch(`${baseUrl}/r/metadata/${inscriptionId}`);
    if (!response.ok) {
        throw new Error("No inscription for Id");
    }
    const dataCBORasHexString = await response.json();
    const dataAsBuffer = Buffer.from(dataCBORasHexString, "hex");
    const data = decode(dataAsBuffer) as OOMD.Metadata;
    return data;
};

/**
 * Fetches a single inscription on a sat based on index.
 * If index is not provided, it defaults to -1, which fetches the most recent inscription.
 * @category Core
 * @param {string} sat - The sat to fetch the inscription from.
 * @param {number} index - The index of the inscription to fetch. Defaults to -1.
 * @param {origin} baseUrl - Optinal baseUrl for the fetch.
 * @returns {Promise<{id: string}>} A promise that resolves with the fetched inscriptionId.
 */
export async function getSatAt(sat: number, index: number = -1, baseUrl: string = _baseUrl): Promise<any> {
    const response = await fetch(`${baseUrl}/r/sat/${sat}/at/${index}`);
    return response.json();
};

/**
 * Fetches the page data for a specific SAT at a given page number.
 * @category Core
 * @param {string} sat - The SAT number to fetch the page data for.
 * @param {number} page - The page number to fetch. Defaults to 0.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 */
export async function getSatPage(sat: number, page: number = 0, baseUrl: string = _baseUrl): Promise<any> {
    try {
        const response = await fetch(`${baseUrl}/r/sat/${sat}/${page}`);
        if (!response.ok) {
            throw new Error('Ord API call was unsuccesful');
        }
        const data = await response.json();
        const ids = data.ids;
        const more = data.more;
        const pageData = data.page;

        return { ids, more, page: pageData };
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches all the inscriptions on a sat.
 * The function fetches the inscriptions in pages, and continues fetching until there are no more pages.
 * @category Core
 * @param {string} sat - The sat to fetch the inscriptions from.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the inscriptions.
 */
export async function getSatAll(sat: number, baseUrl: string = _baseUrl): Promise<string[]> {
    let ids: string[] = [];
    let more = true;
    let page = 0;

    while (more) {
        await getSatPage(sat, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids);
                more = data.more;
                page++;
            }
        }).catch(error => {
            more = false;
        });
    }
    return ids;
};

/**
 * Fetches the parents of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the parents of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the parents from.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 */
export async function getParentsPage(inscriptionId: string = getId(), page: number = 0, baseUrl: string = _baseUrl): Promise<any> {
    let ids: string[] = [];
    let more = true;

    try {
        const response = await fetch(
            `${baseUrl}/r/parents/${inscriptionId}/${page}`);
        if (!response.ok) {
            throw new Error('Ord API call was unsuccesful');
        }
        const data = await response.json();
        ids = ids.concat(data.ids);
        more = data.more;
        page = data.page;
    } catch (error) {
        more = false;
    }
    return { ids, more, page };
};

/**
 * Fetches all the parents of a given inscription.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the parents of.
 *                                 Defaults to the ID obtained from `getId()`.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the parents.
 */
export async function getParentsAll(inscriptionId: string = getId(), baseUrl: string = _baseUrl): Promise<string[]> {
    let ids: string[] = [];
    let more = true;
    let page = 0;


    while (more) {
        await getParentsPage(inscriptionId, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids);
                more = data.more;
                page++;
            }
        }).catch(error => {
            more = false;
        });
    }
    return ids;
};

/**
 * Fetches the children of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the children from.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 */
export async function getChildrenPage(inscriptionId: string = getId(), page: number = 0, baseUrl: string = _baseUrl): Promise<any> {
    let ids: string[] = [];
    let more = true;

    try {
        const response = await fetch(
            `${baseUrl}/r/children/${inscriptionId}/${page}`);
        if (!response.ok) {
            throw new Error('Ord API call was unsuccesful');
        }
        const data = await response.json();
        ids = ids.concat(data.ids);
        more = data.more;
        page = data.page;
    } catch (error) {
        more = false;
    }
    return { ids, more, page };
};

/**
 * Fetches all the children of a given inscription.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID obtained from `getId()`.
 * @param {string} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the children.
 */
export async function getChildrenAll(inscriptionId: string = getId(), baseUrl: string = _baseUrl): Promise<string[]> {
    let ids: string[] = [];
    let more = true;
    let page = 0;

    while (more) {
        await getChildrenPage(inscriptionId, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids);
                more = data.more;
                page++;
            }
        }).catch(error => {
            more = false;
        });
    }

    return ids;
};

/**
 * Fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @category Core
 * @param {string} inscriptionId - Inscription to get all information.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} baseUrl - Optional baseUrl for the fetch
 * @returns {Promise<{inscription: {charms: Array<string>, content_type: string, content_length: number, fee: number, height: number, number: number, output: string, sat: null | string, satpoint: string, timestamp: number, value: number} | null, children: Array<string>, satIds: Array<string>, metadata: Object | null, id: <string>}>} A promise that resolves with all the information about the inscription.
 */
export async function getOOMD(inscriptionId: string = getId(), baseUrl: string = _baseUrl) {
    let res: OOMD.Metadata = {} as OOMD.Metadata;
    try {

        //TODO: Read en project OOMD
        // const metadata = await getInscriptionMetadata(inscriptionId, baseUrl);
        // res.metadata = metadata;
        //res = OOMD.parse(metadata);
    } catch (error) {
    }
    res.id = inscriptionId;
    return res;
};

/**
 * Fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @category Core
 * @param {string} inscriptionId - Inscription to get all information.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} baseUrl - Optional baseUrl for the fetch
 * @returns {Promise<{inscription: {charms: Array<string>, content_type: string, content_length: number, fee: number, height: number, number: number, output: string, sat: null | string, satpoint: string, timestamp: number, value: number} | null, children: Array<string>, satIds: Array<string>, metadata: Object | null, id: <string>}>} A promise that resolves with all the information about the inscription.
 */
export async function getAll(inscriptionId: string = getId(), baseUrl: string = _baseUrl): Promise<any> {
    let res: any = {};
    res.id = inscriptionId;
    try {
        const inscription = await getInscription(inscriptionId, baseUrl);
        res.inscription = inscription;

        const parents = await getParentsAll(inscriptionId, baseUrl);
        res.parents = parents;

        const children = await getChildrenAll(inscriptionId, baseUrl);
        res.children = children;

        const sat = await getSatAll(inscription.sat, baseUrl);
        res.satIds = sat;

        const metadata = await getInscriptionMetadata(inscriptionId, baseUrl);
        res.metadata = metadata;
    } catch (error) {
        throw error;
    }
    return res;
};

/**
 * Fetches information about a specific block by block height or block hash.
 * @category Core
 * @param {string} blockInfo - The block height or block hash to get information about.
 * @param {string} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{bits: number, chainwork: number, confirmations: number, difficulty: number, hash: string, height: number, median_time: number, merkle_root: string, next_block: string, nonce: number, previous_block: string, target: string, timestamp: number, transaction_count: number, version: number} | null>} A promise that resolves with the information about the block or null if not found.
 */
export async function getBlockInfo(blockInfo: string, baseUrl: string = _baseUrl): Promise<any> {
    const url = `${baseUrl}/r/blockinfo/${blockInfo}`;
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Ord API call returned no BlockInfo');
        }
        throw new Error('Ord API call was unsuccesful');
    }

    return response.json();
};

/**
 * Fetches the block hash at a given block height.
 * @category Core
 * @param {number} height - The height of the block to get the hash of.
 * @param {string} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<string | null>} A promise that resolves with the hash of the block or null if 404.
 */
export async function getBlockHash(height: number, baseUrl: string = _baseUrl): Promise<string> {
    const url = `${baseUrl}/r/blockhash/${height}`;
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Ord API call returned no BlockHash');
        }
        throw new Error('Ord API call was unsuccesful');
    }

    const hash = await response.json();
    return hash;
};

/**
 * Fetches the latest block height.
 * @category Core
 * @param {string} baseUrl - The baseUrl for the fetch.
 * @returns {Promise<number>} A promise that resolves with the height of the latest block.
 */
export async function getBlockHeight(baseUrl: string = _baseUrl): Promise<number> {
    try {
        const response = await fetch(`${baseUrl}/r/blockheight`);
        if (!response.ok) {
            throw new Error('Remote API call was unsuccesful');
        }
        const height = await response.text();
        return Number(height);
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches the UNIX time stamp of the latest block.
 * @category Core
 * @param {string} baseUrl - The baseUrl for the fetch.
 * @returns {Promise<number>} A promise that resolves with the UNIX time stamp of the latest block.
 */
export async function getBlockTime(baseUrl: string = _baseUrl): Promise<number> {
    try {
        const response = await fetch(`${baseUrl}/r/blocktime`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const time = await response.text();
        return Number(time);
    } catch (error) {
        throw error;
    }
};

/**
 * Get the latest Id for a supplied Id trough Sat endpoint.
 * @category Core
 * @param {string} id Inscription Id
 * @returns {string} Latest Id for Inscription
 */
export async function getLatestId(id: string): Promise<string> {
    const inscription = await getInscription(id);
    if (inscription.sat !== null) {
        return (await getSatAt(inscription.sat)).id;
    }
    return id;
}

/**
 * Get the path for the latest inscription for a given path.
 * @category Core
 * @param {string} path Path to inscription
 * @returns {string} Path to inscription
 */
export async function getLatestPath(path: string): Promise<string> {
    if (path.startsWith("/content/")) {
        let id = path.substring("/content/".length);
        id = await getLatestId(id);
        path = `/content/${id}`;
    }
    return path;
}

/**
 * Detects if Ordinal API Extensions is available in Origin
 * @category Core
 * @returns {bool} True/False
 */
export async function isOrdinalAPIExtensionsAvailable(): Promise<boolean> {
    const response = await fetch('/content/' + _id, {
        method: 'HEAD'
    });
    if (response.headers.get("X-Sagaverse-Ordinal-API") != undefined && response.headers.get("X-Sagaverse-Ordinal-API") == "true") {
        return true;
    }
    return false;
}

//#endregion

//#region Core Functionality - Iframe

/**
 * Detects and extract Open Ordinal API if present in an Iframe.
 * @category Core
 * @param iframe 
 * @returns 
 */
export async function getOrdinalApiFromIFrame(iframe: HTMLIFrameElement): Promise<any> {
    return new Promise((resolve, reject) => {
        if (typeof iframe === 'undefined') {
            reject("iframe is invalid");
            return;
        }

        function checkIframeLoaded() {
            // Get a handle to the iframe element
            var iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

            // Check if loading is complete
            if (typeof iframeDoc !== 'undefined' && iframeDoc.readyState == 'complete') {
                let ordinal = iframe.contentWindow!;
                let whenLoaded = () => {
                    // TODO - Needed for Tiny Vikings hosted offchain that is not updated yet.
                    let ooAPi = ordinal.ooAPI;

                    if (typeof ooAPi !== 'undefined') {
                        if (ooAPi.isReady()) {
                            resolve(ooAPi);
                        } else {
                            ooAPi.on('ready', () => {
                                resolve(ooAPi);
                            });
                        }
                    } else {
                        reject("OOAPi not available.");
                    }
                };

                if (iframeDoc.readyState == "complete") {
                    whenLoaded();
                } else {
                    ordinal.onload = whenLoaded;
                }
                return;
            }

            window.setTimeout(checkIframeLoaded, 100);
        }
        checkIframeLoaded();
    });
}

//#endregion

//#region Core Functionality - Import and Fetch

/**
 * Imports a JavaScript module.
 * @category Core
 * @param {string }path Path to module to import 
 * @returns {Promise<any>} The module imported
 */
export async function importLatest(path: string): Promise<any> {
    return await import(/* webpackIgnore: true */await getLatestPath(path));
}

/**
 * Fetch a path and return the response.
 * @category Core
 * @param {string} path The path to fetch 
 * @returns {Promise<Response>} The response
 */
export async function fetchLatest(path: string): Promise<Response> {
    return await fetch(await getLatestPath(path));
}

//#endregion

//#region Core Functionality - Cache

/**
 * A cache helper to cache single functions and their return variable.
 * @category Core
 * @param func The function to cache
 * @returns A function which upon subsequent calls with the same id parameter returns the result from the first call.
 */
export function cached<T>(func: (id: string) => Promise<T>): (id: string) => Promise<T> {
    let cache: { [id: string]: Promise<T> } = {};
    return id => {
        var promise = cache[id];
        if (!promise) {
            promise = func(id);
            cache[id] = promise;
        }
        return promise;
    };
}

//#endregion

//#region Variants

/**
 * Add a Variant to memory model
 * @category Variants
 * @param {Variant} variant The Variant to add
 */
export async function addVariant(variant: IVariant): Promise<Variant> {
    var item = new Variant(variant);
    _variants.push(item);
    return item;
}

/**
 * Remove a Variant from memory model
 * @category Variants
 * @param {Variant} variant The Variant to remove
 */
export async function removeVariant(variant: IVariant): Promise<void> {
    _variants = _variants.filter(v => v !== variant);
}

/**
 * Get a Variant from memory model
 * @category Variants
 * @param {Variant} variant The Variant to get
 * @returns {Variant} The Variant
 */
export async function getVariant(id: string): Promise<Variant | undefined> {
    return _variants.find(v => v.id === id);
}

/**
 * Get all Variants from memory model
 * @category Variants
 * @returns {Variant[]} The Variant
 */
export async function getVariants(): Promise<Variant[]> {
    return _variants;
}

/**
 * Clear all Variants from memory model
 * @category Variants
 */
export async function clearVariants(): Promise<void> { _variants = []; }

/**
 * Set which Variant should be visible.
 * @category Variants
 * @param {Variant | string | number} variant - The variant that should be visible. Could be the id of a Variant, an index or a particular Variant.
 */
export async function setDisplayedVariant(variant: Variant | string | number): Promise<void> {
    // Requested to display a given variant.
    let nextVariant: Variant | undefined;

    if (!variant || variant === '') {
        // show first as default
        nextVariant = _variants[0];
    } else if (variant == 'none') {
        // nothing to show
    } else if (typeof variant === 'number') {
        // select by index
        let idx = Number(variant);
        nextVariant = _variants[idx] ?? _variants[0];
    } else if (typeof variant === 'string') {
        // select by id
        nextVariant = await getVariant(variant);
    } else if (variant instanceof Variant) {
        // select by id
        if (variant.id != null)
            nextVariant = await getVariant(variant.id);
    }
    if (nextVariant != _currentVariant) {
        await _currentVariant?.hide();
        _currentVariant = nextVariant;
        await _currentVariant?.show();
    }
}

/**
 * Get the currently visible Variant (if any).
 * @category Variants
 * @returns {Variant} The Variant that currently is visible.
 */
export async function getDisplayedVariant(): Promise<IVariant | undefined | null> {
    return _currentVariant;
}

//#endregion

//#region Compositions

/**
 * Add a Composition to memory model
 * @category Compositions
 * @param {Composition} composition The Composition to add
 */
export async function addComposition(composition: IComposition): Promise<Composition> {
    var item = new Composition(composition);
    _compositions.push(item);
    return item;
}

/**
 * Remove a Composition to memory model
 * @category Compositions
 * @param {Composition} composition The Composition to remove
 */
export async function removeComposition(composition: IComposition): Promise<void> {
    _compositions = _compositions.filter(c => c !== composition);
}

/**
 * Get a Composition from memory model
 * @category Compositions
 * @param compositions The Composition to find 
 * @returns {Composition} The Composition
 */
export async function getComposition(id: string): Promise<Composition | undefined> {
    return _compositions.find(c => c.id === id);
}

/**
 * Get all Compositions from memory model
 * @category Compositions
 * @returns {Composition[]} The Compositions
 */
export async function getCompositions(): Promise<Composition[]> {
    return _compositions;
}

/**
 * Clear all Compositions from memory model
 * @category Compositions
 */
export async function clearCompositions(): Promise<void> { _compositions = []; }

//#endregion

//#region Assets

/**
 * Add an Asset to memory model
 * @category Assets
 * @param  {Asset} asset The Asset to add
 */
export async function addAsset(asset: IAsset): Promise<Asset> {
    var item = new Asset(asset);
    _assets.push(item);
    return item;
}

/**
 * Remove an Asset from memory model
 * @category Assets
 * @param {Asset} asset The addet to remove
 */
export async function removeAsset(asset: Asset): Promise<void> {
    _assets = _assets.filter(a => a !== asset);
}

/**
 * Get an Asset from memory model
 * @category Assets
 * @param {string} id The Asset to find
 * @returns {Asset} The Asset
 */
export async function getAsset(id: string): Promise<Asset | undefined> {
    return _assets.find(a => a.id === id);
}

/**
 * Get all Assets from memory model
 * @category Assets
 * @returns {Promise<Asset[]>} The Assets
 */
export async function getAssets(): Promise<Asset[]> {
    return _assets;
}

/**
 * Remove all Assets from memory model
 * @category Assets
 */
export async function clearAssets(): Promise<void> { _assets = []; }

//#endregion

//#region Traits

/**
 * Add a Trait to memory model
 * @category Traits
 * @param {Trait} trait The Trait to add
 */
export async function addTrait(trait: ITrait): Promise<Trait> {
    var item = new Trait(trait);
    _traits.push(item);
    return item;
}

/**
 * Remove a Trait from memory model
 * @category Traits
 * @param {Trait} trait The Trait to remove
 */
export async function removeTrait(trait: Trait): Promise<void> {
    _traits = _traits.filter(t => t !== trait);
}

/**
 * Get a Trait from memory model
 * @category Traits
 * @param {Trait} trait The Trait to find
 * @returns The Trait
 */
export async function getTrait(id: string): Promise<Trait | undefined> {
    return _traits.find(t => t.id === id);
}

/**
 * Get all Traits from memory model
 * @category Traits
 * @returns {Trait[]} The Traits
 */
export async function getTraits(): Promise<Trait[]> {
    return _traits;
}

/**
 * Remove all Traits from memory model
 * @category Traits
 */
export async function clearTraits(): Promise<void> { _traits = []; }

//#endregion

//#region Collections

/**
 * Add a Collection
 * @category Collections
 * @param {Collection} collection Add a Collection
 * @returns {Collection} The Collections
 */
export async function addCollection(collection: ICollection): Promise<Collection> {
    var item = new Collection(collection);
    _collections.push(item);
    return item;
}

/**
 * Get a Collection
 * @category Collections
 * @param {string} id The collection to get
 * @returns {Collection | undefined} The Collection
 */
export async function getCollection(id: string): Promise<Collection | undefined> {
    return _collections.find(c => c.id === id);
}

/**
 * Get all Collections
 * @category Collections
 * @returns {Collection[]} The Collections
 */
export async function getCollections(): Promise<Collection[]> {
    return _collections;
}

/**
 * Remove a Collection
 * @category Collections
 * @param {Collection} collection The Collection to be removed
 */
export async function removeCollection(collection: Collection): Promise<void> {
    _collections = _collections.filter(t => t !== collection)
}

/**
 * Remove all Collections
 * @category Collections
 */
export async function clearCollections(): Promise<void> {
    _collections = [];
}

//#endregion

//#region Animations

function setAnimationTemplate(animationTemplateMap: TemplateMap): void {
    if (!_animationManager) { _animationManager = new AnimationManager() }

    _animationManager.setAnimationTemplate(animationTemplateMap);
}

function getAnimationManager() {
    if (!_animationManager) { _animationManager = new AnimationManager() }

    return _animationManager;
}

//#endregion

//#region Events Wrap Helpers

function on(name: string, handler: any) {
    _events.addListener(name, handler);
}

function off(name: string, handler: any) {
    _events.removeListener(name, handler);
}

function isReady() {
    return _ready;
}

/**
 * Called by the Ordinal when it's setup is done.
 */
async function ready() {
    _ready = true;

    // TODO Review. This is to not load the default variant, but the one specified in the URL.
    let variantToShow = _requestParams.get('variant');
    if (variantToShow) {
        setDisplayedVariant(variantToShow);
    } else if (_variants.length > 0) {
        setDisplayedVariant(_variants[0]);
    }

    /* TODO
    if (_requestParams.has('animation')) {
    }
    */

    /* TODO Figure out this one.
    ** Display a given composition instead of a variant?
    if (_requestParams.has('composition')) {
    }
    */

    _events.emit("ready");
}

//#endregion

//#region General Helpers

function getInscriptionIdFromUrl(): string {
    const parts = window.location.pathname.split("/");
    if (parts.length >= 3 && (parts[1] === "content" || parts[1] === "preview" || parts[1] === "inscription")) {
        return parts[2];
    } else {
        console.error("URL does not contain a valid inscription ID.", parts);
        return "";
    }
}

function getURLParams() {
    try {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((value, key) => {
            _requestParams.set(key.toLowerCase(), value.toLowerCase());
        });
    } catch (error) {
        console.error("Error parsing URL parameters:", error);
    }
}

//#endregion

//#region On Load Triggers

_baseUrl = window.location.origin;
getURLParams();

//#endregion