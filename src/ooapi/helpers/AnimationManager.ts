/// <reference types="p5/global" />

import { loadScript } from './ScriptLoader';

type Asset = string;

export interface AssetMap {
  [key: string]: Asset;
}

export interface KeyframeProps {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
}

export interface Keyframe {
  [assetName: string]: KeyframeProps;
}

export interface AnimationTemplate {
  duration: number;
  keyframes: {
    [frame: number]: Keyframe;
  };
}

export interface TemplateMap {
  [name: string]: AnimationTemplate;
}

export class AnimationManager {
  private assets: AssetMap | null;
  private loadedAssets: Map<string, p5.Image>;
  private templates: TemplateMap;
  private currentAnimation: string | null;
  private currentFrame: number;
  private p5Renderer: p5.Renderer | null;
  private p5: P5 | null;
  private p5OrdSrc: string | null;
  private scriptState: number;
  private canvasParent: HTMLElement | null;

  constructor() {
    this.assets = null;
    this.templates = {};
    this.currentAnimation = null;
    this.currentFrame = 0;
    this.p5Renderer = null;
    this.p5 = null;
    this.p5OrdSrc = null;
    this.scriptState = 0;
    this.loadedAssets = new Map<string, p5.Image>();
    this.canvasParent = null;
  }
  
  public setP5Source(p5OrdId: string) {
    this.p5OrdSrc = p5OrdId;
  } 

  public setAssets(assets: AssetMap) { 
    this.assets = assets;
  }

  public setCanvasParent(parent: HTMLElement) {
    this.canvasParent = parent;
  }

  public setAnimationTemplate(animationTemplate: TemplateMap) {
    this.templates = animationTemplate;
  }

  public addTemplate(name: string, template: AnimationTemplate): void {
    this.templates[name] = template;
  }

  private async ensureReady(): Promise<void> {
    return new Promise(async (resolve, reject) => {

      if(!this.p5OrdSrc) { 
        // error
        reject("No p5.js source");
        return;
      }
      await loadScript(this.p5OrdSrc);

      if(this.scriptState > 0) {
        // Apply new assets
        if(this.p5) {
          if(this.assets) {
            for( const [key, value] of Object.entries(this.assets) ) {
              this.loadedAssets.set(key, await this.p5.loadImage(value) );
            }
          }
        }
        resolve();
      } else {
        this.scriptState = 1;

        const self = this;
        new p5((p: P5) => {
          p.preload = async function () {
            // TODO Load /content/<ordid> or base64
            if(self.assets) {
              for( const [key, value] of Object.entries(self.assets) ) {
                self.loadedAssets.set(key, await p.loadImage(value) );
              }
            }
          };
          p.setup = async function () {
            self.p5 = p;

            let canvasParent = document.createElement('div');
            canvasParent.style.width = "420px";
            canvasParent.style.height = "420px";
            canvasParent.style.display = "block";
            canvasParent.id = "canvasparent";

            if(self.canvasParent) {
              const parentDocument = window.parent.document;
              const parentId = self.canvasParent.id;
              console.log("Parent ID: " + parentId);
              const parentElement = parentDocument.getElementById(self.canvasParent.id);
              self.canvasParent.appendChild(canvasParent);

              self.p5Renderer = p.createCanvas(420, 420);
              self.p5.noSmooth(); // Optional
              self.p5.pixelDensity(1);
  
              if (parentElement) {
                //self.p5Renderer.parent(canvasParent);
              } else {
                console.error("Parent element not found in parent document");
              }

              //self.p5Renderer.parent(canvasParent)
              self.p5Renderer.style("display", "block")
              self.p5Renderer.style("visibility", "visible")
            } else {
              // TODO Update
              let container = document.querySelector('div.image-container')
              if( container ) {
                let img = container.querySelector('img');
                if (img) {
                    img.style.display = 'none';
                }
                container.appendChild(canvasParent);
              }
              self.p5Renderer = p.createCanvas(504, 504);
              self.p5.noSmooth();
              self.p5.pixelDensity(1);
  
              self.p5Renderer.parent("canvasparent")
              self.p5Renderer.style("display", "block")
            }

            resolve();
          };
          p.draw = function () {
            self.update();
            self.draw();
          };
          p.windowResized = function () {
            // Window Resized
          };
        });
      }
      // TODO source must be full url for now - support test env directly lookup
		});
  }

  public async playAnimation(name: string): Promise<void> {
    await this.ensureReady()

    if (this.templates[name]) {
      this.currentAnimation = name;
      this.currentFrame = 0;
    } else {
      console.error(`Animation template '${name}' not found`);
    }
  }

  public update(): void {
    if (this.currentAnimation) {
      const template = this.templates[this.currentAnimation];
      this.currentFrame = (this.currentFrame + 1) % template.duration;
    }
  }

  public snapshot(): string {
    if(this.p5Renderer) {
      return this.p5Renderer.elt.toDataURL("image/png");
    } else {
      return "empty";
    }
  }

  public draw(): void {
    
    if (!this.currentAnimation) return;
  
    const template = this.templates[this.currentAnimation];
    const keyframes = template.keyframes;

    let prevFrame = 0;
    let nextFrame = template.duration;
    for (let frame in keyframes) {
      const frameNum = parseInt(frame);
      if (frameNum <= this.currentFrame && frameNum > prevFrame) prevFrame = frameNum;
      if (frameNum > this.currentFrame && frameNum < nextFrame) nextFrame = frameNum;
    }

    const t = (this.currentFrame - prevFrame) / (nextFrame - prevFrame);
    const prevKeyframe = keyframes[prevFrame];
    const nextKeyframe = keyframes[nextFrame];

    this.p5?.clear();
    for (let key of this.loadedAssets.keys()) {
      const asset: p5.Image | undefined = this.loadedAssets.get(key);

      if( asset ) {
        const prevProps: KeyframeProps = prevKeyframe[key] || {};
        const nextProps: KeyframeProps = nextKeyframe[key] || {};

        const x = this.lerp(prevProps.x || 0, nextProps.x || 0, t);
        const y = this.lerp(prevProps.y || 0, nextProps.y || 0, t);
        const scale = this.lerp(prevProps.scale || 1, nextProps.scale || 1, t);
        const rotation = this.lerp(prevProps.rotation || 0, nextProps.rotation || 0, t);
        
        this.p5?.push();
        this.p5?.translate(x, y);
        this.p5?.rotate(rotation);
        this.p5?.scale(scale);
        this.p5?.image(asset, 0, 0, 420, 420);
        this.p5?.pop();
      }
    }
  }

  private lerp(start: number, end: number, amt: number): number {
    return (1 - amt) * start + amt * end;
  }
}