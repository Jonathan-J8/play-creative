<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem;
  padding-bottom: 0;
  font-weight: normal;
  min-height: 100vh;
  min-height: fill-available;
  min-height: -webkit-fill-available;
  min-height: -moz-available;
}

@media (max-width: 1024px) {
  .container {
    padding: 2rem;
  }
}
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
}
</style>
