<script lang="ts">
export default {
  name: "ControllerBackground",
};
</script>
<script setup lang="ts">
import DetailsSummary from "@ui/DetailsSummary.vue";
import { reactiveSate } from "./store";
</script>

<template>
  <DetailsSummary summary="Background">
    <label class="label">
      Color
      <input class="input" v-model="reactiveSate.color" type="color" />
    </label>
  </DetailsSummary>
</template>
