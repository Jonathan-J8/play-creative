import { reactive, readonly } from "vue";

type State = {
  text: string;
};

const defaultState: State = {
  text: "Creative Developer \nat PlayPlay",
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
