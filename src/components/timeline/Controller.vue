<script lang="ts">
export default {
  name: "TimeLineController",
};
</script>
<script setup lang="ts">
import { watch } from "vue";

import { animations, reactiveState } from "./store";

const playPauseAnimations = (paused: boolean) => {
  if (!paused) {
    animations.batch.forEach((a) => {
      a.play();
    });
  } else {
    animations.batch.forEach((a) => {
      a.pause();
    });
  }
};

const play = () => {
  reactiveState.paused = !reactiveState.paused;
};

const restart = () => {
  animations.batch.forEach((a) => {
    a.seek(0);
    a.pause();
  });
  playPauseAnimations(reactiveState.paused);
};

// fire when paused state change.
watch(() => reactiveState.paused, playPauseAnimations);

// fire when adding/removing animations.
watch(
  () => animations.id,
  (a) => {
    playPauseAnimations(reactiveState.paused);
  }
);
</script>

<template>
  <div>
    <button @click="play" class="play">
      {{ reactiveState.paused ? "play" : "pause" }}
    </button>
    <button @click="restart">Restart</button>

    <slot />
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
  color: var(--color-text);
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
  padding: 0.5rem;
  border: solid 1px var(--color-border);
  border-radius: 0.5rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.seek > input {
  flex-grow: 1;
}
.seek > span {
  text-align: right;
  min-width: 40px;
}
</style>
