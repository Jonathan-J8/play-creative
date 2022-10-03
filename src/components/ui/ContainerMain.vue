<template>
  <main>
    <div class="left">
      <slot name="left"> </slot>
    </div>
    <div class="right">
      <slot name="right"> </slot>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
}

@media (max-width: 768px) {
  main {
    justify-content: center;
  }
  .right {
    width: 100%;
  }
}

.left {
  min-width: 30%;
}
.right {
  min-width: 50%;
}
</style>
