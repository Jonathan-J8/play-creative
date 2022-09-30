import { reactive, readonly } from "vue";
import type {
  DisplayObject,
  Rectangle,
  IRenderableObject,
  RenderTexture,
} from "pixi.js";

type State = {
  paused: boolean;
  loop: boolean | number;
  progress: number;
  duration: number;
};

const defaultState: State = {
  paused: true,
  loop: false,
  progress: 0,
  duration: 4440,
};

export type Animate = (delta: number, elapsed: number, step: number) => void;

export const RENDERER_KEY = "renderer";

export const animationsSet = new Set<Animate>();

export type RendererContext = {
  state: Readonly<State>;
  addAnimation: (fn: Animate) => void;
  removeAnimation: (fn: Animate) => void;
  addChild: (child: DisplayObject) => void;
  removeChild: (child: DisplayObject) => void;
  generateTexture: (displayObject: IRenderableObject) => RenderTexture;
  getScreenDimension: () => Rectangle;
  getCanvasDimension: () => number;
};

export const reactiveState = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveState);
export default readonlyState;
