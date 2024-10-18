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
import { IVariant, Variant } from './models/globals/Variant.js';
import { IComposition, Composition } from './models/globals/Composition.js';
import { IAsset, Asset } from './models/globals/Asset.js';
import { ITrait, Trait } from './models/globals/Trait.js';

export { IVariant, Variant } from './models/globals/Variant.js';
export { IComposition, Composition } from './models/globals/Composition.js';
export { IAsset, Asset } from './models/globals/Asset.js';
export { ITrait, Trait } from './models/globals/Trait.js';

//Models - Globals
import { IOrdinal, OrdinalType, Ordinal } from './models/base/Ordinal.js';
import { IAudio, Audio } from './models/base/Audio.js';
import { IImage, Image } from './models/base/Image.js';
import { IVideo, Video } from './models/base/Video.js';
import { ISprite, SpriteType, Sprite, SpriteAnimation } from './models/utilities/Export/Sprite.js'

export { IOrdinal, OrdinalType, Ordinal } from './models/base/Ordinal.js';
export { IAudio, Audio } from './models/base/Audio.js';
export { IImage, Image } from './models/base/Image.js';
export { IVideo, Video } from './models/base/Video.js';
export { ISprite, SpriteType, Sprite, SpriteAnimation } from './models/utilities/Export/Sprite.js'

//Models - Use Cases
import { ICollectionTrait, ICollection, Collection } from './models/usecases/Collection.js';

export { ICollectionTrait, ICollection, Collection } from './models/usecases/Collection.js';

// Helpers
import { loadScript } from './helpers/ScriptLoader.js';
import { AssetMap, KeyframeProps, Keyframe, AnimationTemplate, TemplateMap, AnimationManager } from './helpers/AnimationManager.js';

//OOMD Inports
import * as OOMD from "@open-ordinal/metadata";
export * as OOMD from "@open-ordinal/metadata";

// Loaders
export * from './loaders/Artist.js';
export * from './loaders/Release.js';
export * from './loaders/Track.js';

//Imported Third-Party Modules
import { decode } from 'cbor-x';
import { Buffer } from 'buffer';
import camelize from 'camelize-ts'
import { EventEmitter } from 'events';
import { Export, ExportType, getExportType } from './models/utilities/Export.js';

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
 * Asynchronously retrieves the internal metadata for a given ID.
 * 
 * @category Core
 * @param {string} id - The unique identifier for the metadata.
 * @returns {Promise<OOMD.Metadata>} - A promise that resolves to the metadata object.
 */
export async function getMetadata(id: string): Promise<OOMD.Metadata> {
    // Check if metadata is undefined or if a new ID is provided, then fetch the metadata
    if (_metadata == undefined || id != undefined) {
        _metadata = await getInscriptionMetadata(id);
    }
    // Return the fetched or existing metadata
    return _metadata;
}

/**
 * Asynchronously retrieves inscription data for a given inscription ID.
 * 
 * @category Core
 * @param {string} [inscriptionId=getId()] - The unique identifier for the inscription. Defaults to the result of getId().
 * @param {string} [baseUrl=_baseUrl] - The base URL for the API endpoint. Defaults to _baseUrl.
 * @returns {Promise<any>} - A promise that resolves to the inscription data or null if the request fails.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getInscription(inscriptionId = getId(), baseUrl = _baseUrl): Promise<any> {
    try {
        // Fetch the inscription data from the API endpoint
        const response = await fetch(prepareUrl(`/r/inscription/${inscriptionId}`, baseUrl));

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            return null;
        }

        // Parse the response as JSON
        const json = await response.json();

        // Return the parsed JSON data
        return json;
    } catch (error) {
        // Throw an error if the fetch operation fails
        throw error;
    }
}

/**
 * Asynchronously retrieves metadata for a given inscription ID.
 * 
 * @category Core
 * @param {string} [inscriptionId=getId()] - The unique identifier for the inscription. Defaults to the result of getId().
 * @param {string} [baseUrl=_baseUrl] - The base URL for the API endpoint. Defaults to _baseUrl.
 * @returns {Promise<OOMD.Metadata>} - A promise that resolves to the metadata object.
 * @throws Will throw an error if the fetch operation fails or if the response is not OK.
 */
async function getInscriptionMetadata(inscriptionId = getId(), baseUrl = _baseUrl): Promise<OOMD.Metadata> {
    // Fetch the metadata for the given inscription ID from the API endpoint
    const response = await fetch(prepareUrl(`/r/metadata/${inscriptionId}`, baseUrl));

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
        throw new Error("No inscription for Id");
    }

    // Parse the response as a JSON string containing hexadecimal data
    const dataCBORasHexString = await response.json();

    // Convert the hexadecimal string to a buffer
    const dataAsBuffer = Buffer.from(dataCBORasHexString, "hex");

    // Decode the buffer into the metadata object
    const data = decode(dataAsBuffer) as OOMD.Metadata;

    // Return the decoded metadata
    return data;
}

/**
 * Asynchronously retrieves SAT data for a given sat number and index.
 * 
 * @category Core
 * @param {number} sat - The unique identifier for the SAT.
 * @param {number} [index=-1] - The index for the SAT data. Defaults to -1 which fetches the most recent inscription.
 * @param {string} [baseUrl=_baseUrl] - The base URL for the API endpoint. Defaults to _baseUrl.
 * @returns {Promise<any>} - A promise that resolves to the SAT data.
 */
export async function getSatAt(sat: number, index: number = -1, baseUrl: string = _baseUrl): Promise<any> {
    // Fetch the satellite data from the API endpoint
    const response = await fetch(prepareUrl(`/r/sat/${sat}/at/${index}`, baseUrl));

    // Parse and return the response as JSON
    return response.json();
}

/**
 * Asynchronously fetches the page data for a specific SAT at a given page number.
 * 
 * @category Core
 * @param {number} sat - The SAT number to fetch the page data for.
 * @param {number} [page=0] - The page number to fetch. Defaults to 0.
 * @param {string} [baseUrl=_baseUrl] - Optional base URL for the fetch. Defaults to _baseUrl.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>} - A promise that resolves to an object containing the IDs, a boolean indicating if there are more pages, and the current page number.
 * @throws Will throw an error if the fetch operation fails or if the response is not OK.
 */
export async function getSatPage(sat: number, page: number = 0, baseUrl: string = _baseUrl): Promise<any> {
    try {
        // Fetch the page data for the given SAT number and page number from the API endpoint
        const response = await fetch(prepareUrl(`/r/sat/${sat}/${page}`, baseUrl));

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            throw new Error('Ord API call was unsuccessful');
        }

        // Parse the response as JSON
        const data = await response.json();

        // Extract the IDs, more flag, and page data from the response
        const ids = data.ids;
        const more = data.more;
        const pageData = data.page;

        // Return the extracted data as an object
        return { ids, more, page: pageData };
    } catch (error) {
        // Throw an error if the fetch operation fails
        throw error;
    }
}

/**
 * Asynchronously fetches all the inscriptions on a given SAT.
 * The function fetches the inscriptions in pages and continues fetching until there are no more pages.
 * 
 * @category Core
 * @param {number} sat - The SAT number to fetch the inscriptions from.
 * @param {string} [baseUrl=_baseUrl] - Optional base URL for the fetch. Defaults to _baseUrl.
 * @returns {Promise<string[]>} - A promise that resolves with an array of the IDs of the inscriptions.
 */
export async function getSatAll(sat: number, baseUrl: string = _baseUrl): Promise<string[]> {
    let ids: string[] = [];
    let more = true;
    let page = 0;

    while (more) {
        // Fetch the inscriptions for the current page
        await getSatPage(sat, page, baseUrl).then(data => {
            if (data != null) {
                // Concatenate the fetched IDs with the existing IDs
                ids = ids.concat(data.ids);
                // Check if there are more pages to fetch
                more = data.more;
                // Increment the page number for the next fetch
                page++;
            }
        }).catch(error => {
            // Stop fetching if an error occurs
            more = false;
        });
    }
    // Return the array of fetched IDs
    return ids;
}

/**
 * Asynchronously fetches the parents of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 * 
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the parents of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the parents from.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>} - A promise that resolves to an object containing:
 *                                                                         - ids: An array of parent IDs.
 *                                                                         - more: A boolean indicating if there are more pages.
 *                                                                         - page: The current page number.
 */
export async function getParentsPage(inscriptionId: string = getId(), page: number = 0, baseUrl: string = _baseUrl): Promise<any> {
    let ids: string[] = []; // Initialize an empty array to store parent IDs
    let more = true; // Flag to indicate if there are more pages

    try {
        // Fetch the parents data from the API endpoint
        const response = await fetch(prepareUrl(`/r/parents/${inscriptionId}/${page}`, baseUrl));

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            throw new Error('Ord API call was unsuccessful'); // Throw an error if the API call fails
        }

        // Parse the response as JSON
        const data = await response.json();

        // Concatenate the fetched IDs with the existing array
        ids = ids.concat(data.ids);

        // Update the 'more' flag based on the response
        more = data.more;

        // Update the page number based on the response
        page = data.page;
    } catch (error) {
        // Set 'more' to false if an error occurs
        more = false;
    }

    // Return the result as an object
    return { ids, more, page };
};

/**
 * Asynchronously fetches all the parents of a given inscription.
 * 
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the parents of.
 *                                 Defaults to the ID obtained from `getId()`.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} - A promise that resolves with an array of the IDs of the parents.
 */
export async function getParentsAll(inscriptionId: string = getId(), baseUrl: string = _baseUrl): Promise<string[]> {
    let ids: string[] = []; // Initialize an empty array to store parent IDs
    let more = true; // Flag to indicate if there are more pages
    let page = 0; // Initialize the page number

    // Loop to fetch all pages of parent IDs
    while (more) {
        await getParentsPage(inscriptionId, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids); // Concatenate the fetched IDs with the existing array
                more = data.more; // Update the 'more' flag based on the response
                page++; // Increment the page number
            }
        }).catch(error => {
            more = false; // Set 'more' to false if an error occurs
        });
    }
    return ids; // Return the array of parent IDs
};

/**
 * Asynchronously fetches the children of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 * 
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the children from.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>} - A promise that resolves to an object containing:
 *                                                                         - ids: An array of children IDs.
 *                                                                         - more: A boolean indicating if there are more pages.
 *                                                                         - page: The current page number.
 */
export async function getChildrenPage(inscriptionId: string = getId(), page: number = 0, baseUrl: string = _baseUrl): Promise<any> {
    let ids: string[] = []; // Initialize an empty array to store children IDs
    let more = true; // Flag to indicate if there are more pages

    try {
        // Fetch the children data from the API endpoint
        const response = await fetch(prepareUrl(`/r/children/${inscriptionId}/${page}`, baseUrl));

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            throw new Error('Ord API call was unsuccessful'); // Throw an error if the API call fails
        }

        // Parse the response as JSON
        const data = await response.json();

        // Concatenate the fetched IDs with the existing array
        ids = ids.concat(data.ids);

        // Update the 'more' flag based on the response
        more = data.more;

        // Update the page number based on the response
        page = data.page;
    } catch (error) {
        // Set 'more' to false if an error occurs
        more = false;
    }

    // Return the result as an object
    return { ids, more, page };
};

/**
 * Asynchronously fetches all the children of a given inscription.
 * 
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID obtained from `getId()`.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} - A promise that resolves with an array of the IDs of the children.
 */
export async function getChildrenAll(inscriptionId: string = getId(), baseUrl: string = _baseUrl): Promise<string[]> {
    let ids: string[] = []; // Initialize an empty array to store children IDs
    let more = true; // Flag to indicate if there are more pages
    let page = 0; // Initialize the page number

    // Loop to fetch all pages of children IDs
    while (more) {
        await getChildrenPage(inscriptionId, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids); // Concatenate the fetched IDs with the existing array
                more = data.more; // Update the 'more' flag based on the response
                page++; // Increment the page number
            }
        }).catch(error => {
            more = false; // Set 'more' to false if an error occurs
        });
    }

    return ids; // Return the array of children IDs
};

/**
 *  Asynchronously fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
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
 * Asynchronously fetches all information about an inscription, including children,
 * sat inscriptions, metadata, and its ID.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * 
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get all information about.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<any>} - A promise that resolves with all the information about the inscription.
 */
export async function getAll(inscriptionId: string = getId(), baseUrl: string = _baseUrl): Promise<any> {
    let res: any = {}; // Initialize an empty object to store the result
    res.id = inscriptionId; // Assign the inscription ID to the result

    try {
        // Fetch the inscription data
        const inscription = await getInscription(inscriptionId, baseUrl);
        res.inscription = inscription; // Assign the fetched inscription data to the result

        // Fetch all parent IDs
        const parents = await getParentsAll(inscriptionId, baseUrl);
        res.parents = parents; // Assign the fetched parent IDs to the result

        // Fetch all children IDs
        const children = await getChildrenAll(inscriptionId, baseUrl);
        res.children = children; // Assign the fetched children IDs to the result

        // Fetch all sat IDs
        const sat = await getSatAll(inscription.sat, baseUrl);
        res.satIds = sat; // Assign the fetched sat IDs to the result

        // Fetch the metadata
        const metadata = await getInscriptionMetadata(inscriptionId, baseUrl);
        res.metadata = metadata; // Assign the fetched metadata to the result
    } catch (error) {
        throw error; // Throw an error if any fetch operation fails
    }

    return res; // Return the result object containing all fetched information
};

/**
 * Asynchronously fetches information about a specific block by block height or block hash.
 * 
 * @category Core
 * @param {string} blockInfo - The block height or block hash to get information about.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<any>} - A promise that resolves with the information about the block or null if not found.
 */
export async function getBlockInfo(blockInfo: string, baseUrl: string = _baseUrl): Promise<any> {
    const response = await fetch(prepareUrl(`/r/blockinfo/${blockInfo}`, baseUrl)); // Fetch the block information from the API

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Ord API call returned no BlockInfo'); // Throw an error if the block is not found
        }
        throw new Error('Ord API call was unsuccessful'); // Throw an error if the API call fails
    }

    return response.json(); // Parse and return the response as JSON
};

/**
 * Asynchronously fetches the block hash at a given block height.
 * 
 * @category Core
 * @param {number} height - The height of the block to get the hash of.
 * @param {string} [baseUrl=_baseUrl] - Optional baseUrl for the fetch.
 * @returns {Promise<string | null>} - A promise that resolves with the hash of the block or null if not found.
 */
export async function getBlockHash(height: number, baseUrl: string = _baseUrl): Promise<string> {
    const response = await fetch(prepareUrl(`/r/blockhash/${height}`, baseUrl)); // Fetch the block hash from the API

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Ord API call returned no BlockHash'); // Throw an error if the block hash is not found
        }
        throw new Error('Ord API call was unsuccessful'); // Throw an error if the API call fails
    }

    const hash = await response.json(); // Parse and return the response as JSON
    return hash;
};

/**
 * Asynchronously fetches the latest block height.
 * 
 * @category Core
 * @param {string} [baseUrl=_baseUrl] - The base URL for the fetch.
 * @returns {Promise<number>} - A promise that resolves with the height of the latest block.
 */
export async function getBlockHeight(baseUrl: string = _baseUrl): Promise<number> {
    try {
        // Fetch the latest block height from the API endpoint
        const response = await fetch(prepareUrl(`/r/blockheight`, baseUrl));

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            throw new Error('Remote API call was unsuccessful'); // Throw an error if the API call fails
        }

        // Parse the response as text
        const height = await response.text();

        // Convert the height to a number and return it
        return Number(height);
    } catch (error) {
        // Throw an error if the fetch operation fails
        throw error;
    }
};

/**
 * Asynchronously fetches the UNIX time stamp of the latest block.
 * 
 * @category Core
 * @param {string} [baseUrl=_baseUrl] - The base URL for the fetch.
 * @returns {Promise<number>} - A promise that resolves with the UNIX time stamp of the latest block.
 */
export async function getBlockTime(baseUrl: string = _baseUrl): Promise<number> {
    try {
        // Fetch the UNIX time stamp of the latest block from the API endpoint
        const response = await fetch(prepareUrl(`/r/blocktime`, baseUrl));

        // Check if the response is not OK (status code outside the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if the API call fails
        }

        // Parse the response as text
        const time = await response.text();

        // Convert the time to a number and return it
        return Number(time);
    } catch (error) {
        // Throw an error if the fetch operation fails
        throw error;
    }
};

/**
 * Asynchronously get the latest ID for a supplied ID through the Sat endpoint.
 * 
 * @category Core
 * @param {string} id - The inscription ID.
 * @returns {Promise<string>} - A promise that resolves with the latest ID for the inscription.
 */
export async function getLatestId(id: string): Promise<string> {
    // Fetch the inscription data using the provided ID
    const inscription = await getInscription(id);

    // Check if the inscription has a 'sat' property that is not null
    if (inscription.sat !== null) {
        // Fetch and return the latest ID from the Sat endpoint
        return (await getSatAt(inscription.sat)).id;
    }

    // Return the original ID if 'sat' is null
    return id;
}

/**
 * Asynchronously get the path for the latest inscription for a given path.
 * 
 * @category Core
 * @param {string} path - The path to the inscription.
 * @returns {Promise<string>} - A promise that resolves with the path to the latest inscription.
 */
export async function getLatestPath(path: string): Promise<string> {
    let prefix = new String("/content/"); //Webpack workarround.

    // Check if the path starts with "/content/"
    if (path.startsWith(prefix.toString())) {
        // Extract the ID from the path
        let id = path.substring(prefix.length);

        // Get the latest ID for the extracted ID
        id = await getLatestId(id);

        // Update the path with the latest ID
        path = prefix + id;
    }

    // Return the updated path
    return path;
}

/**
 * Asynchronously detects if Ordinal API Extensions is available in Origin.
 * 
 * @category Core
 * @returns {Promise<boolean>} - A promise that resolves to true if the Ordinal API Extensions are available, otherwise false.
 */
export async function isOrdinalAPIExtensionsAvailable(): Promise<boolean> {
    // Send a HEAD request to the specified URL
    const response = await fetch('/content/' + _id, {
        method: 'HEAD'
    });

    // Check if the response headers contain "X-Sagaverse-Ordinal-API" and if its value is "true"
    if (response.headers.get("X-Sagaverse-Ordinal-API") != undefined && response.headers.get("X-Sagaverse-Ordinal-API") == "true") {
        return true; // Return true if the Ordinal API Extensions are available
    }

    return false; // Return false if the Ordinal API Extensions are not available
}

//#endregion

//#region Core Functionality - Iframe

/**
 * Detects and extracts Open Ordinal API if present in an Iframe.
 * 
 * @category Core
 * @param {HTMLIFrameElement} iframe - The iframe element to check for the Open Ordinal API.
 * @returns {Promise<any>} - A promise that resolves with the Open Ordinal API if available, otherwise rejects with an error message.
 */
export async function getOrdinalApiFromIFrame(iframe: HTMLIFrameElement): Promise<any> {
    return new Promise((resolve, reject) => {
        // Check if the iframe is undefined
        if (typeof iframe === 'undefined') {
            reject("iframe is invalid"); // Reject the promise if the iframe is invalid
            return;
        }

        function checkIframeLoaded() {
            // Get a handle to the iframe document
            var iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

            // Check if the iframe loading is complete
            if (typeof iframeDoc !== 'undefined' && iframeDoc.readyState == 'complete') {
                let ordinal = iframe.contentWindow!;
                let whenLoaded = () => {
                    let ooAPi = ordinal.ooAPI;

                    // Check if the Open Ordinal API is available
                    if (typeof ooAPi !== 'undefined') {
                        // Check if the Open Ordinal API is ready
                        if (ooAPi.isReady()) {
                            resolve(ooAPi); // Resolve the promise with the Open Ordinal API
                        } else {
                            // Wait for the Open Ordinal API to be ready
                            ooAPi.on('ready', () => {
                                resolve(ooAPi); // Resolve the promise with the Open Ordinal API
                            });
                        }
                    } else {
                        reject("ooAPI not available."); // Reject the promise if the Open Ordinal API is not available
                    }
                };

                // Check if the iframe document is fully loaded
                if (iframeDoc.readyState == "complete") {
                    whenLoaded(); // Call the whenLoaded function if the document is complete
                } else {
                    ordinal.onload = whenLoaded; // Set the onload event to call the whenLoaded function
                }
                return;
            }

            // Retry checking the iframe loading status after 100ms
            window.setTimeout(checkIframeLoaded, 100);
        }
        checkIframeLoaded(); // Initial call to checkIframeLoaded function
    });
}

//#endregion

//#region Core Functionality - Import and Fetch

/**
 * Imports a JavaScript module.
 * 
 * @category Core
 * @param {string} path - The path to the module to import.
 * @returns {Promise<any>} - A promise that resolves with the imported module.
 */
export async function importLatest(path: string): Promise<any> {
    // Get the latest path for the module
    const latestPath = await getLatestPath(path);

    // Import the module using the latest path
    return await import(/* webpackIgnore: true */latestPath);
}

/**
 * Fetch a path and return the response.
 * 
 * @category Core
 * @param {string} path - The path to fetch.
 * @returns {Promise<Response>} - A promise that resolves with the response.
 */
export async function fetchLatest(path: string): Promise<Response> {
    // Get the latest path for the given path
    const latestPath = await getLatestPath(path);

    // Fetch the resource at the latest path and return the response
    return await fetch(latestPath);
}

//#endregion

//#region Core Functionality - Cache

/**
 * A cache helper to cache single functions and their return variable.
 * 
 * @category Core
 * @param {function} func - The function to cache.
 * @returns {function} - A function which upon subsequent calls with the same id parameter returns the result from the first call.
 */
export function cached<T>(func: (id: string) => Promise<T>): (id: string) => Promise<T> {
    let cache: { [id: string]: Promise<T> } = {}; // Initialize an empty object to store cached promises

    return id => {
        var promise = cache[id]; // Retrieve the cached promise for the given id

        // If no cached promise exists, call the function and cache its promise
        if (!promise) {
            promise = func(id);
            cache[id] = promise;
        }

        // Return the cached or newly created promise
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

/**
 * Extracts the inscription ID from the current URL.
 * 
 * @returns {string} - The inscription ID extracted from the URL, or an empty string if the URL is invalid.
 */
function getInscriptionIdFromUrl(): string {
    // Split the URL path into parts using "/" as the delimiter
    const parts = window.location.pathname.split("/");
    const lookFor: string[] = ['content', 'preview', 'inscription'];

    // Check if the URL contains any known parts and get ID
    if (parts.some(item => lookFor.includes(item))) {
        return parts[parts.length - 1]; // Return the last part as the inscription ID
    } else {
        // Log an error message if the URL does not contain a valid inscription ID
        return ""; // Return an empty string if the URL is invalid
    }
}

/**
 * Extracts URL parameters and stores them in a global request parameters map.
 */
function getURLParams() {
    try {
        // Create a URLSearchParams object from the query string of the current URL
        const searchParams = new URLSearchParams(window.location.search);

        // Iterate over each key-value pair in the URL parameters
        searchParams.forEach((value, key) => {
            // Convert both key and value to lowercase and store them in the global _requestParams map
            _requestParams.set(key.toLowerCase(), value.toLowerCase());
        });
    } catch (error) {
        // Log an error message if an exception occurs while parsing URL parameters
        console.error("Error parsing URL parameters:", error);
    }
}

function getBaseUrl(): string {
    const parts = window.location.pathname.split("/");
    const lookFor: string[] = ['content', 'preview', 'inscription', 'r'];
    let urlOut: string[] = [];

    if (parts.some(item => lookFor.includes(item))) {
        for (let index = 0; index < parts.length; index++) {
            if(lookFor.includes(parts[index]))
                break;
            urlOut.push(parts[index]);
        }
        return urlOut.join("/");
    } else {
        return window.location.origin;
    }
}

function prepareUrl(url: string, baseUrl: string) {
    if (url.includes("http"))
        return url;
    return `${baseUrl}${url}`;
}

//#endregion

//#region On Load Triggers

_baseUrl = getBaseUrl();
getURLParams();

//#endregion