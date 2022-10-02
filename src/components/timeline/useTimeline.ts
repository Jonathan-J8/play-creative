import state, { add, remove } from "./store";

// Use only this  method from outside timeline folder
const useTimeline = () => ({ state, add, remove });
export default useTimeline;
