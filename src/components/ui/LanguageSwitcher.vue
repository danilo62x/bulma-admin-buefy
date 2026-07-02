<template>
  <b-dropdown aria-role="list" position="is-bottom-left">
    <template #trigger>
      <button class="button is-ghost tx-icon-btn" :title="current.label" aria-label="Idioma">
        <span style="font-size: 1.1rem;">{{ current.flag }}</span>
      </button>
    </template>
    <b-dropdown-item
      v-for="lang in LANGUAGES"
      :key="lang.code"
      aria-role="listitem"
      :class="{ 'has-text-weight-semibold': lang.code === current.code }"
      @click="choose(lang.code)"
    >
      <span style="margin-right: 0.5rem;">{{ lang.flag }}</span>
      {{ lang.label }}
      <span v-if="lang.code === current.code" class="mdi mdi-check" style="float: right;" />
    </b-dropdown-item>
  </b-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LANGUAGES, setLanguage, type LanguageCode } from '@/i18n'

const { locale } = useI18n()
const current = computed(() => LANGUAGES.find((l) => l.code === locale.value) ?? LANGUAGES[0])

function choose(code: LanguageCode) {
  setLanguage(code)
}
</script>
