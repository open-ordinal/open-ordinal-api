/**
 * Trait Class
 */
export interface ITrait {
    id: string;
    name?: string;
    value?: string;
}

export class Trait implements ITrait {
    id: string;
    name?: string;
    value?: string;

    constructor(options: ITrait) {
        this.id = options.id;
        this.name = options.name;
        this.value = options.value as string;
    }
}
