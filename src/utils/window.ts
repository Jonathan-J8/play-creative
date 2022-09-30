export const getWindowResolution = (): number => window.devicePixelRatio || 1;

export const getWindowWidth = (): number =>
  window.innerWidth / getWindowResolution();

export const getWindowHeight = (): number =>
  window.innerHeight / getWindowResolution();
