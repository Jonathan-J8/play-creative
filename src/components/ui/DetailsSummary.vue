<script setup lang="ts">
const props = defineProps({ summary: String });
</script>

<template>
  <details open class="details">
    <summary class="summary">{{ props.summary }}</summary>
    <div>
      <slot />
    </div>
  </details>
</template>
