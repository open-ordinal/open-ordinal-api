import { Export, Exportable } from "../utilities/Export.js";

/**
 * A Composition in the Open Ordinal API is a single image as a combination
 * of assets. This can be a single image with different assets combined (staged).
 * 
 * Examples of what a Composition can be:
 * - Single image composed of multiple assets
 * - Animated GIF
 * - Rigged of multiple assets
 * - PFP (With background),
 * - PFP (No background)
 * - PFP Theme
 * - and so on...
 */
export interface IComposition {
    id: string;
    name?: string;
    onExport?: () => Promise<Export>;
}

/**
 * A Composition in the Open Ordinal API is a single image as a combination
 * of assets. This can be a single image with different assets combined (staged).
 * 
 * Examples of what a Composition can be:
 * - Single image composed of multiple assets
 * - Animated GIF
 * - Rigged of multiple assets
 * - PFP (With background),
 * - PFP (No background)
 * - PFP Theme
 * - and so on...
 */
export class Composition extends Exportable {
    id: string;
    name?: string;

    constructor(options: IComposition) {
        super(options.onExport);
        this.id = options.id;
        this.name = options.name;
    }
}
