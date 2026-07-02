<template>
  <template v-if="route.meta.layout === 'blank'">
    <RouterView />
  </template>
  <AppLayout v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import AppLayout from '@/components/layout/AppLayout.vue'

const route = useRoute()
const { init } = useTheme()

onMounted(() => {
  init()
})
</script>
