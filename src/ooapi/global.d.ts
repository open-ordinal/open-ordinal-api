declare namespace p5 {
    interface Image {}
    interface Renderer {
        style(a: string, b:string): void;
        parent(a: string): void;
        elt: HTMLCanvasElement;
    }
}

declare type P5 = {
    elt: HTMLCanvasElement;
    clear(): void;
    createCanvas(): void;
    createCanvas(w: number, h: number, renderer?: p5.Renderer, canvas?: object): p5.Renderer;
    draw(): void;
    image(image: p5.Image, w: number, h: number): void;
    image(image: p5.Image, x: number, y: number, w: number, h: number): void;
    loadImage(path: string): Promise<p5.Image>;
    noSmooth(): void;
    pixelDensity(number): void;
    pop(): void;
    preload(): void;
    push(): void;
    rotate(rotation: number): void;
    scale(scale: number): void;
    setup(): void;
    translate(x: number, y: number): void;
    windowResized(): void;
};

declare const p5: any;