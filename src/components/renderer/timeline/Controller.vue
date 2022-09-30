<script lang="ts">
export default {
  name: "TimelineController",
};
</script>
<script setup lang="ts">
import { onMounted } from "vue";
import { timeline, reactiveSate } from "./store";

const play = () => {
  if (timeline.paused) timeline.play();
  else timeline.pause();
  reactiveSate.paused = timeline.paused;
};
const restart = () => {
  timeline.restart();
};

const loop = () => {
  reactiveSate.loop = !reactiveSate.loop;
  timeline.loop = reactiveSate.loop;
  restart();
};

const seek = (e: Event) => {
  const target = e.target as HTMLInputElement;
  reactiveSate.progress = parseInt(target?.value) || 0;
  timeline.pause();
  timeline.seek(timeline.duration * (reactiveSate.progress / 100));
};

onMounted(() => {
  timeline.update = (e) => {
    reactiveSate.progress = Math.floor(e.progress);
  };

  timeline.finished.then(() => {
    reactiveSate.paused = true;
    reactiveSate.progress = 0;
  });
});
</script>

<template>
  <div>
    <button @click="play" class="play">
      {{ reactiveSate.paused ? "play" : "pause" }}
    </button>
    <button @click="restart">Restart</button>
    <button @click="loop" :class="{ loop: reactiveSate.loop }">Loop</button>
    <input
      class="seek"
      @input="seek"
      :value="reactiveSate.progress"
      step=".001"
      type="range"
      min="0"
      max="100"
    />
    <p class="progress">{{ reactiveSate.progress }}%</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  background-color: var(--color-background);
  padding: 1rem;
  border: solid 1px var(--color-border);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
input {
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
}
button {
  cursor: pointer;
  text-transform: uppercase;
  color: var(--color-text);
  background-color: transparent;
  border: none;
}

.play {
  min-width: 4rem;
}
.loop {
  text-decoration: underline;
}
.seek {
  flex-grow: 1;
}
.duration {
  color: var(--color-text);
  text-align: right;
}
.progress {
  text-align: right;
  min-width: 40px;
}
</style>
