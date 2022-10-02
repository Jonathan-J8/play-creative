<script lang="ts">
export default {
  name: "RendererProvider",
};
</script>
<script lang="ts" setup>
import { onMounted, ref, provide, onUnmounted } from "vue";
import {
  Application,
  utils,
  type DisplayObject,
  type IApplicationOptions,
  type IRenderableObject,
} from "pixi.js";

import onResize from "@hooks/onResize";
import { getWindowResolution } from "@utils/window";
import { RENDERER_KEY, type RendererContext } from "./constants";
utils.skipHello();

/**
 * var
 */

const props = defineProps<{ options?: IApplicationOptions }>();
const outerContainer = ref<HTMLElement | null>(null);
const innerContainer = ref<HTMLElement | null>(null);
const scale = ref(1);
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

const addChild = (child: DisplayObject) => app.value.stage.addChild(child);

const removeChild = (child: DisplayObject) =>
  app.value.stage.removeChild(child);

const getScreenDimension = () => app.value.screen;

const generateTexture = (displayObject: IRenderableObject) =>
  app.value.renderer.generateTexture(displayObject);

/**
 * provider
 */

provide<RendererContext>(RENDERER_KEY, {
  addChild,
  removeChild,
  generateTexture,
  getScreenDimension,
});

/**
 * lifecycle
 */

const resize = () => {
  // methods who resize the scale of the parent htmlelement
  // the app scale stay the same on window resize so
  // there is no need to resize the app screen/renderer
  if (!innerContainer.value || !outerContainer.value) return;
  const w1 = outerContainer.value.clientWidth;
  const h1 = outerContainer.value.clientHeight;
  const w2 = innerContainer.value.clientWidth;
  const h2 = innerContainer.value.clientHeight;
  scale.value = Math.min(w1 / w2, h1 / h2);
};

onMounted(() => {
  app.value.renderer.resolution = getWindowResolution();

  if (!innerContainer.value)
    throw new Error("Renderer did not found parent HTMLElement");
  innerContainer.value.appendChild(app.value.view);

  resize();
});

onResize(resize);

onUnmounted(() => {
  if (!app.value) return;
  app.value.destroy();
});
</script>

<template>
  <div ref="outerContainer" class="outer-container">
    <div
      ref="innerContainer"
      class="inner-container"
      :style="{
        width: `${props?.options?.width || 100}px`,
        height: `${props?.options?.height || 100}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }"
    ></div>

    <slot
      v-if="app instanceof Application && app?.renderer && !!innerContainer"
    />
  </div>
</template>

<style scoped>
.outer-container {
  position: relative;
  min-width: 260px;
  min-height: 260px;
  aspect-ratio: 1/1;
}

.inner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 100px;
  height: 100px;
}
</style>
