import { reactive, readonly } from "vue";
// import LocalStorage from "@utils/LocalStorage";
// const storage = new LocalStorage("controls", { immutable: false });

type State = {
  count: number;
  color: string;
  rotation: number;
  turbulenceXY: number;
  turbulenceRotation: number;
  seed: number;
};

const defaultState: State = {
  count: 64,
  color: "#69c2b5",
  rotation: 120,
  turbulenceXY: 10,
  turbulenceRotation: 180,
  seed: 0,
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
