<script lang="ts">
export default {
  name: "ControllerText",
};
</script>
<script setup lang="ts">
import { reactiveSate } from "./store";
import DetailsSummary from "@ui/DetailsSummary.vue";
import { onMounted, ref } from "vue";
import getFontsAvailables from "@/utils/fonts";

const fonts = ref<string[]>([]);

onMounted(async () => {
  fonts.value = await getFontsAvailables();
});
</script>

<template>
  <DetailsSummary summary="Text">
    <label class="label">
      Paragraph
      <!-- TODO : debounce text change -->
      <textarea class="input" v-model="reactiveSate.text" rows="2" />
    </label>
    <label class="label">
      Font
      <select v-model="reactiveSate.fontFamily">
        <option disabled value="">Please select a font</option>
        <option v-for="font in fonts" :key="font">{{ font }}</option>
      </select>
    </label>
  </DetailsSummary>
</template>
