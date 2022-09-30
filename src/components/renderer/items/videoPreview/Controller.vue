<script lang="ts">
export default {
  name: "ControllerVideoPreview",
};
</script>
<script setup lang="ts">
import { range2numberFromObject } from "@utils/converter";
import DetailsSummary from "@ui/DetailsSummary.vue";
import { reactiveSate } from "./store";

const handleOpacity = range2numberFromObject(reactiveSate, "opacity");
</script>

<template>
  <DetailsSummary summary="Video Preview">
    <label class="label">
      Opacity
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
  </DetailsSummary>
</template>
