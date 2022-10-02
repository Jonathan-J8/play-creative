import { reactive, readonly } from "vue";

type State = {
  text: string;
  fontFamily: string;
};

const defaultState: State = {
  text: "Creative Developer \nat PlayPlay",
  fontFamily: "Courier",
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
