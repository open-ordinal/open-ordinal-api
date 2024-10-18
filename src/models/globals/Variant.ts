import { Export, ExportType, Exportable, getExportType } from '../utilities/Export.js';
import { OrdinalType } from '../base/Ordinal.js';

/**
 * Variant Class
 * A Variant is a variant of the ordinal. It's a visual distinct visual representation.
 * It can be 2D and / or 3D or any other variation. Not to be confused with Composition.
 */
export interface IVariant {
    id: string;
    type?: OrdinalType;
    name?: string;
    onDisplay?: () => Promise<void>; // Called when this Variant is to be shown.
    onHide?: () => Promise<void>; // Called when this Variant is to be hidden.
    onExport?: () => Promise<Export>;
}

/**
 * Variant Class
 * A Variant is a variant of the ordinal. It's a visual distinct visual representation.
 * It can be 2D and / or 3D or any other variation. Not to be confused with Composition.
 */
export class Variant extends Exportable {
    id: string;
    type?: OrdinalType;
    name?: string;
    onDisplay?: () => Promise<void>; // Called when this Variant is to be shown.
    onHide?: () => Promise<void>; // Called when this Variant is to be hidden.

    constructor(options: IVariant) {
        super(options.onExport);
        this.type = options.type;
        this.id = options.id;
        this.name = options.name;
        this.onDisplay = options.onDisplay;
        this.onHide = options.onHide;
    }

    async show() {
        if (this.onDisplay) {
            await this.onDisplay();
        } else if (this.onExport) {
            const ex = await this.onExport();

            if (getExportType(ex) === ExportType.ORDINAL) {
                const frame = document.createElement('iframe');
                frame.src = `/preview/${ex}`;
                frame.frameBorder = "0";
                frame.style.border = "none";
                frame.style.outline = "none";
                frame.style.overflow = "hidden";
                frame.style.width = "100%";
                frame.style.height = "100%";
                frame.style.position = "fixed";
                frame.style.top = "0";
                frame.style.left = "0";
                frame.style.bottom = "0";
                frame.style.right = "0";
                frame.style.margin = "0";
                frame.style.padding = "0";
                frame.style.zIndex = "999999";
                frame.scrolling = "no";

                document.body.style.border = "0";
                document.body.appendChild(frame);
            }
        }
    }

    async hide() {
        if (this.onHide) {
            await this.onHide();
        } else if (this.canExport()) {
            document.body.innerHTML = '';
        }
    }
}
