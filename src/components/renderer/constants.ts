import type {
  DisplayObject,
  Rectangle,
  IRenderableObject,
  RenderTexture,
} from "pixi.js";

export const RENDERER_KEY = "renderer";

export type RendererContext = {
  addChild: (child: DisplayObject) => void;
  removeChild: (child: DisplayObject) => void;
  generateTexture: (displayObject: IRenderableObject) => RenderTexture;
  getScreenDimension: () => Rectangle;
};
