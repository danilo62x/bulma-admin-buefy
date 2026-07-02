<template>
  <div class="tx-card">
    <div v-if="title || $slots.title || $slots.toolbar" class="tx-card-header">
      <span v-if="icon" class="mdi tx-card-header-icon" :class="icon" />
      <span class="tx-card-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <slot name="toolbar" />
    </div>
    <div class="tx-card-body" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" class="tx-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    icon?: string
    noPadding?: boolean
  }>(),
  { noPadding: false }
)

const bodyStyle = computed(() =>
  props.noPadding ? { padding: 0 } : {}
)
</script>
