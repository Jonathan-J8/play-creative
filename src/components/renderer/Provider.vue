<script lang="ts">
export default {
  name: "RendererProvider",
};
</script>
<script lang="ts" setup>
import { onMounted, ref, provide, onUnmounted, onBeforeUpdate } from "vue";
import {
  Application,
  Ticker,
  utils,
  type DisplayObject,
  type IApplicationOptions,
  type IRenderableObject,
} from "pixi.js";

import onResize from "@hooks/onResize";
import { getWindowResolution } from "@utils/window";
import RendererController from "./Controller.vue";
import state, {
  RENDERER_KEY,
  animationsSet,
  type RendererContext,
  type Animate,
} from "./store";
utils.skipHello();

/**
 * var
 */
const props = defineProps<{ options?: IApplicationOptions }>();
const container = ref<HTMLElement | null>(null);
const ticker = ref<Ticker | null>(null);
const app = ref<Application>(
  new Application({
    antialias: true,
    backgroundAlpha: 0,
    width: 100,
    height: 100,
    resolution: 1,
    ...props?.options,
  })
);

/**
 * methods
 */
const addAnimation = (fn: Animate) => animationsSet.add(fn);

const removeAnimation = (fn: Animate) => animationsSet.delete(fn);

const addChild = (child: DisplayObject) => app.value.stage.addChild(child);

const removeChild = (child: DisplayObject) =>
  app.value.stage.removeChild(child);

const getScreenDimension = () => app.value.screen;

const generateTexture = (displayObject: IRenderableObject) =>
  app.value.renderer.generateTexture(displayObject);

const getCanvasDimension = () => {
  if (!container.value) return 0;
  const { width, height } = container.value.getBoundingClientRect();
  return (width > height ? height : width) / getWindowResolution();
};

/**
 * provider
 */
provide<RendererContext>(RENDERER_KEY, {
  state,
  addAnimation,
  removeAnimation,
  addChild,
  removeChild,
  generateTexture,
  getCanvasDimension,
  getScreenDimension,
});

/**
 * lifecycle
 */

let currentTime = 0.0;
let progress = 0.0;
let elapsed = 0.0;
const onAnimate = (delta: number) => {
  if (!state.paused) {
    elapsed += delta;
    currentTime += ticker.value?.deltaMS || 0;
    currentTime = currentTime % state.duration;
    // progress = ((currentTime / state.duration) % 1) * 100;
    progress = (currentTime / state.duration) * 100;
  } else {
    progress = state.progress;
    currentTime = (state.duration * state.progress) / 100;
  }

  // const step = Math.floor(elapsed % state.steps);
  animationsSet.forEach((fn) => fn(delta, elapsed, currentTime, progress));
};

onMounted(() => {
  const dimension = getCanvasDimension();
  app.value.renderer.resolution = getWindowResolution();
  app.value.renderer.resize(dimension, dimension);
  ticker.value = app.value.ticker.add(onAnimate);

  if (!container.value)
    throw new Error("Renderer did not found parent HTMLElement");
  container.value.appendChild(app.value.view);

  Array.from(container.value.children).forEach((el) => {
    el.style.outline = "solid 1px yellow";
  });
});

onResize(() => {
  const dimension = getCanvasDimension();
  app.value.renderer.resize(dimension, dimension);
  // app.value.renderer.view.style.width =
  //   dimension * getWindowResolution() + "px";
  // app.value.renderer.view.style.height =
  //   dimension * getWindowResolution() + "px";
});

onBeforeUpdate(() => {
  console.log("trace update");
});

onUnmounted(() => {
  if (!app.value) return;
  app.value.ticker.remove(onAnimate);

  // ticker.value?.destroy();
  app.value.destroy();
});
</script>

<template>
  <div class="outer container">
    <div ref="container" class="container"></div>
    <!-- <RendererController /> -->
    <slot v-if="app instanceof Application && app?.renderer && !!container" />
  </div>
</template>

<style scoped>
.container {
  min-width: 260px;
  min-height: 260px;
  aspect-ratio: 1/1;
}
.outer.container {
  position: relative;
}
</style>
<!-- 

// const addAnimation = (
//   params: AnimeAnimParams,
//   timelineOffset?: string | number | undefined
// ): AnimeTimelineInstance => timeline.add(params, timelineOffset); -->
