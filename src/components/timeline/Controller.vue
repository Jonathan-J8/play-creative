<script lang="ts">
export default {
  name: "TimeLineControls",
};
</script>
<script setup lang="ts">
import { animations, reactiveState } from "./store";

const play = () => {
  reactiveState.paused = !reactiveState.paused;

  if (!reactiveState.paused) {
    animations.forEach((a) => {
      a.play();
    });
  } else {
    animations.forEach((a) => {
      a.pause();
    });
  }
};
const restart = () => {
  reactiveState.progress = 0;
  animations.forEach((a) => {
    a.seek(0);
  });
};

const loop = () => {
  reactiveState.loop = !reactiveState.loop;

  restart();
};

const seek = (e: Event) => {
  const target = e.target as HTMLInputElement;
  reactiveState.progress = parseInt(target?.value) || 0;
};
</script>

<template>
  <div>
    <button @click="play" class="play">
      {{ reactiveState.paused ? "play" : "pause" }}
    </button>
    <button @click="restart">Restart</button>
    <button @click="loop" :class="{ loop: reactiveState.loop }">Loop</button>
    <label class="seek">
      <input
        @input="seek"
        :value="reactiveState.progress"
        step=".001"
        type="range"
        min="0"
        max="100"
      />
      <span>{{ reactiveState.progress }}%</span>
    </label>
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
