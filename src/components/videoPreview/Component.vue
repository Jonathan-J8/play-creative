<script lang="ts">
export default {
  name: "VideoPreview",
};
</script>
<script lang="ts" setup>
import { ref } from "vue";
import state from "./store";
const video = ref<HTMLVideoElement | null>(null);
</script>

<template>
  <video
    ref="video"
    :style="{ opacity: state.opacity / 100 }"
    src="/playplay.mp4"
    preload="auto"
    width="300"
    height="300"
    controls
    loop
  />
</template>

<style scoped>
video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  aspect-ratio: 1/1;
  height: auto;
  opacity: 1;
}
</style>
