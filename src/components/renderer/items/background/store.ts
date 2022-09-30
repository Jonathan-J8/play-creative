import { reactive, readonly } from "vue";

type State = {
  color: string;
};

const defaultState: State = {
  color: "#0a3970",
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
