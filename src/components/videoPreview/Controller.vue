<script lang="ts">
export default {
  name: "VideoPreviewController",
};
</script>
<script setup lang="ts">
import { range2numberFromObject } from "@utils/converter";
import { reactiveSate } from "./store";

const handleOpacity = range2numberFromObject(reactiveSate, "opacity");
</script>

<template>
  <label class="label">
    Video Preview opacity
    <input
      class="input"
      :value="reactiveSate.opacity"
      @input="handleOpacity"
      type="range"
      min="0"
      max="100"
      step="1"
    />
  </label>
</template>
<style scoped>
label {
  font-size: 0.8rem;
}
</style>
