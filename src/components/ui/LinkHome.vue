<template>
  <a
    href="/"
    target="_self"
    aria-label="Redirect to home page (reload page)"
    title="Redirect to home page (reload page)"
  >
    <slot />
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color-text);
}
</style>
