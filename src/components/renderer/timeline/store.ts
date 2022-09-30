import { reactive, readonly } from "vue";
import anime from "animejs";

const DURATION = 4000;

export const timeline = anime.timeline({
  duration: DURATION,
  loop: false,
  autoplay: false,
  // easing: `steps(${10})`,
});

type State = {
  paused: boolean;
  loop: boolean | number;
  progress: number;
};

const defaultState: State = {
  paused: timeline.paused,
  loop: timeline.loop,
  progress: timeline.progress,
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});

const readonlyState = readonly(reactiveSate);
export default readonlyState;
