import { reactive, readonly } from "vue";
// import LocalStorage from "@utils/LocalStorage";

// const storage = new LocalStorage("controls", { immutable: false });

// type AnimationParams = {
//   delay: number;
//   duration: number;
// };
// const defaultAnimation: AnimationParams = { delay: 0, duration: 0 };
type State = {
  text: string;
  frequency: number;
};

const defaultState: State = {
  text: "Creative Developer \nat PlayPlay",
  frequency: 0,
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
