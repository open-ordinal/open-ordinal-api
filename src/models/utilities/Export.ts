export type Export = string | Blob /*| Renderer*/;

export enum ExportType {
    ORDINAL = 'ordinal', // ordinals id
    DATA = 'data', // data url
    BLOB = 'blob', // blob
    RENDERER = 'renderer'
}

export function getExportType(ex: Export): ExportType {
    if (ex instanceof Blob) {
        return ExportType.BLOB;
    } else if (typeof ex === 'string') {
        if (ex.startsWith('data:')) {
            return ExportType.DATA;
        } else if (ex.startsWith('blob:')) {
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