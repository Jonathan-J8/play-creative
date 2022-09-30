<script lang="ts">
export default {
  name: "ControllerText",
};
</script>
<script setup lang="ts">
import { reactiveSate } from "./store";
import DetailsSummary from "@ui/DetailsSummary.vue";
</script>

<template>
  <DetailsSummary summary="Text"
    ><label class="label">
      Paragraph
      <textarea class="input" v-model="reactiveSate.text" rows="2" />
    </label>
  </DetailsSummary>
</template>
