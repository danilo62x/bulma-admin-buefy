<template>
  <footer
    style="padding: 0.75rem 1.25rem; border-top: 1px solid var(--tx-border); text-align: center; font-size: 0.78rem; color: var(--tx-text-muted); background: var(--tx-card-bg); transition: background-color var(--tx-transition);"
  >
    &copy; {{ year }} Admin Template — Vue 3 + Bulma + Buefy
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
