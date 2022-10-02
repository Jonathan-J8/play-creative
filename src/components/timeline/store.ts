import { readonly, reactive } from "vue";
import anime from "animejs";
import type { AnimeParams, AnimeInstance } from "animejs";

/**
 * Batch all animations in Map
 */
export const animations = new Map<string, AnimeInstance>();

export const add = (key: string, params: AnimeParams) => {
  animations.set(key, anime(params));
};

export const remove = (key: string) => {
  animations.delete(key);
};

/**
 * global timeline state
 */
type State = {
  paused: boolean;
  loop: boolean | number;
  progress: number;
  duration: number;
};

const defaultState: State = {
  paused: false,
  loop: false,
  progress: 0,
  duration: 4440,
};

export const reactiveState = reactive<State>({ ...defaultState });
const readonlyState = readonly(reactiveState);
export default readonlyState;
