import { reactive, readonly } from "vue";

type State = {
  opacity: number;
};

const defaultState: State = {
  opacity: 0,
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
