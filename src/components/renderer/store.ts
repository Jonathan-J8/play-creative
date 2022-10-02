import { reactive, readonly } from "vue";
import type {
  DisplayObject,
  Rectangle,
  IRenderableObject,
  RenderTexture,
} from "pixi.js";
import type { AnimeInstance } from "animejs";

type State = {
  paused: boolean;
  loop: boolean | number;
  progress: number;
  duration: number;
};

const defaultState: State = {
  paused: true,
  loop: true,
  progress: 0,
  duration: 2345,
};

// export type Animate = (
//   delta: number,
//   elapsed: number,
//   currentTime: number,
//   progress: number
// ) => void;

export const RENDERER_KEY = "renderer";

export const animationsSet = new Set<AnimeInstance>();

export type RendererContext = {
  // addAnimation: (animation: AnimeInstance) => void;
  // removeAnimation: (animation: AnimeInstance) => void;
  addChild: (child: DisplayObject) => void;
  removeChild: (child: DisplayObject) => void;
  generateTexture: (displayObject: IRenderableObject) => RenderTexture;
  getScreenDimension: () => Rectangle;
};

export const reactiveState = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveState);
export default readonlyState;
