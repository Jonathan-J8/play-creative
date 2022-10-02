import { reactive, readonly } from "vue";

type State = {
  count: number;
  color: string;
  rotation: number;
  turbulenceXY: number;
  turbulenceRotation: number;
};

const defaultState: State = {
  count: 49,
  color: "#69c2b5",
  rotation: 30,
  turbulenceXY: 10,
  turbulenceRotation: 180,
};

export const reactiveSate = reactive<State>({
  ...defaultState,
});
const readonlyState = readonly(reactiveSate);
export default readonlyState;
