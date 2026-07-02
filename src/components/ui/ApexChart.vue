<template>
  <VueApexCharts :type="type" :series="series" :options="merged" :height="height" :width="width" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { useUiStore } from '@/stores/ui'

const props = withDefaults(
  defineProps<{
    type:
      | 'line'
      | 'area'
      | 'bar'
      | 'pie'
      | 'donut'
      | 'radialBar'
      | 'scatter'
      | 'heatmap'
      | 'candlestick'
      | 'radar'
      | 'polarArea'
    series: ApexOptions['series']
    options?: ApexOptions
    height?: number | string
    width?: number | string
  }>(),
  { options: () => ({}), height: 300, width: '100%' }
)

const ui = useUiStore()

const merged = computed<ApexOptions>(() => {
  const o = props.options
  const fg = ui.darkMode ? '#98a2b3' : '#667085'
  const grid = ui.darkMode ? '#1f2937' : '#e4e7ec'
  return {
    chart: {
      fontFamily: 'Outfit, sans-serif',
      foreColor: fg,
      toolbar: { show: false },
      zoom: { enabled: false },
      ...o.chart,
    },
    colors: o.colors ?? ['#465fff', '#12b76a', '#f79009', '#f04438', '#0ba5ec'],
    grid: { borderColor: grid, strokeDashArray: 4, ...o.grid },
    tooltip: { theme: ui.darkMode ? 'dark' : 'light', ...o.tooltip },
    legend: { labels: { colors: fg }, ...o.legend },
    dataLabels: { enabled: false, ...o.dataLabels },
    stroke: { curve: 'smooth', width: 2, ...o.stroke },
    ...o,
  }
})
</script>
