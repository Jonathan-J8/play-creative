<script lang="ts">
export default {
  name: "ControllerParticles",
};
</script>
<script setup lang="ts">
import { range2numberFromObject } from "@/utils/converter";
import DetailsSummary from "@ui/DetailsSummary.vue";
import { reactiveSate } from "./store";

const handleCount = range2numberFromObject(reactiveSate, "count");
const handleRotation = range2numberFromObject(reactiveSate, "rotation");
const handleTurbulenceXY = range2numberFromObject(reactiveSate, "turbulenceXY");
const handleTurbulenceRotation = range2numberFromObject(
  reactiveSate,
  "turbulenceRotation"
);
</script>

<template>
  <DetailsSummary summary="Particles">
    <label class="label">
      Color
      <input class="input" v-model="reactiveSate.color" type="color" />
    </label>

    <label class="label">
      Rotation
      <input
        class="input"
        :value="reactiveSate.rotation"
        @input="handleRotation"
        type="range"
        min="0"
        max="360"
        step="1"
      />
      &nbsp;{{ reactiveSate.rotation }}
    </label>
    <label class="label">
      Count
      <input
        class="input"
        :value="reactiveSate.count"
        @input="handleCount"
        type="range"
        min="0"
        max="100"
        step="1"
      />
      &nbsp;{{ reactiveSate.count }}
    </label>
    <label class="label">
      Turbulence XY
      <input
        class="input"
        :value="reactiveSate.turbulenceXY"
        @input="handleTurbulenceXY"
        type="range"
        min="0"
        max="100"
        step="1"
      />
      &nbsp;{{ reactiveSate.turbulenceXY }}
    </label>
    <label class="label">
      Turbulence Rotation
      <input
        class="input"
        :value="reactiveSate.turbulenceRotation"
        @input="handleTurbulenceRotation"
        type="range"
        min="0"
        max="360"
        step="1"
      />
      &nbsp;{{ reactiveSate.turbulenceRotation }}
    </label>
  </DetailsSummary>
</template>
