export type Export = string | Blob /*| Renderer*/;

export enum ExportType {
    ORDINAL = 'ordinal', // ordinals id
    DATA = 'data', // data url
    BLOB = 'blob', // blob
    RENDERER = 'renderer'
}

/**
 * Get the ExportType
 * 
 * @category Core
 * @param {Export} exportObject Export object
 */
export function getExportType(exportObject: Export): ExportType {
    if (exportObject instanceof Blob) {
        return ExportType.BLOB;
    } else if (typeof exportObject === 'string') {
        if (exportObject.startsWith('data:')) {
            return ExportType.DATA;
        } else if (exportObject.startsWith('blob:')) {
            return ExportType.BLOB;
        } else {
            return ExportType.ORDINAL;
        }
    }
    throw new Error("Unsupported export type");
}

export class Exportable {
    onExport?: () => Promise<Export>;

    constructor(onExport?: () => Promise<Export>) {
        this.onExport = onExport;
    }

    canExport(): boolean {
        return typeof this.onExport !== 'undefined';
    }

    async export(): Promise<string> {
        if (!this.onExport) {
            throw new Error("Nothing to export!");
        }

        const exported = await this.onExport();

        if (exported instanceof Blob) {
            return URL.createObjectURL(exported);
        }

        switch (getExportType(exported)) {
            case ExportType.BLOB:
                return exported as string;
            case ExportType.DATA:
                return exported as string;
            case ExportType.ORDINAL:
                return '/content/' + exported;
            case ExportType.RENDERER:
                throw new Error("Renderer export type is not supported");
        }
    }
}