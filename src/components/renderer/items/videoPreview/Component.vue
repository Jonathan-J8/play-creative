<script lang="ts">
export default {
  name: "RendererVideoPreview",
};
</script>
<script lang="ts" setup>
import { watch, ref } from "vue";
// import timelineState from "@renderer/timeline/store";
import state from "./store";

const video = ref<HTMLVideoElement | null>(null);

// watch(
//   () => timelineState.paused,
//   (paused) => {
//     if (!video.value) return;
//     if (state.opacity === 0) {
//       video.value.pause();
//       return;
//     }
//     if (paused) video.value.pause();
//     else video.value.play();
//   }
// );

// watch(
//   () => timelineState.progress,
//   (progress) => {
//     if (!video.value) return;
//     video.value.currentTime = video.value.duration * (progress / 100);
//   }
// );
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
  <!-- :loop="timelineState.loop ? true : false" -->
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
