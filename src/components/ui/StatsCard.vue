<template>
  <div class="tx-stats-card">
    <div class="tx-stats-icon" :style="{ '--icon-color': iconColor }">
      <span class="mdi" :class="icon" />
    </div>
    <div class="tx-stats-info">
      <div class="tx-stats-value">{{ value }}</div>
      <div class="tx-stats-label">{{ label }}</div>
      <div v-if="trend" class="tx-stats-trend" :style="{ color: trendColor }">
        <span class="mdi" :class="trendIcon" style="font-size: 0.85rem;" />
        {{ trend }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string | number
  label: string
  icon: string
  color?: string
  trend?: string
  trendUp?: boolean
}>()

const iconColor = computed(() => props.color ?? '#485fc7')

const trendColor = computed(() =>
  props.trendUp === undefined
    ? 'var(--tx-text-muted)'
    : props.trendUp
    ? 'var(--tx-success)'
    : 'var(--tx-danger)'
)

const trendIcon = computed(() =>
  props.trendUp === undefined
    ? 'mdi-minus'
    : props.trendUp
    ? 'mdi-trending-up'
    : 'mdi-trending-down'
)
</script>
