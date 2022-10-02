export const hex2num = (str: string) => parseInt(str.slice(1), 16);

export const deg2rad = (deg: number) => deg * (Math.PI / 180);

export const rad2deg = (rad: number) => rad * (180 / Math.PI);

/**
 * <input type="range"/> return a string by default.
 * Needed to convert string to number when using object
 *
 * How to use it ?
 * const handleCount = range2numberFromObject(state, "count");
 * <input type="range" :value="sate.count" @input="handleCount" />
 */
export const range2numberFromObject = (obj: any, key: string) => (e: Event) => {
  const target = e?.target as HTMLInputElement;
  if (typeof target?.value === "string") {
    obj[key] = parseInt(target.value);
  }
};
