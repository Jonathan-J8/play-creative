import { readonly, reactive, shallowReactive } from "vue";
import anime, { type AnimeParams, type AnimeInstance } from "animejs";

/**
 * Batch all animations in a Map()
 * Make it reactive to stay up to date with the timeline state
 * Use shallowReactive otherwise vue will traverse all AnimeInstance
 */
export const animations = shallowReactive({
  id: 0,
  batch: new Map<string, AnimeInstance>(),
});

export const add = (key: string, params: AnimeParams) => {
  animations.batch.set(key, anime(params));
  animations.id = performance.now();
};

export const remove = (key: string) => {
  animations.batch.delete(key);
  animations.id = performance.now();
};

/**
 * global timeline state
 */

// TODO : implement duration, loop and progress in the state to have more controls over the timeline/animations
// duration: number;
// loop: boolean;
// progress: number;

type State = {
  paused: boolean;
};

const defaultState: State = {
  paused: false,
};

export const reactiveState = reactive<State>({ ...defaultState });
const readonlyState = readonly(reactiveState);
export default readonlyState;
