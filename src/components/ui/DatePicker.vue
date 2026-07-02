<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <b-datepicker
        :model-value="modelValue"
        :placeholder="placeholder"
        :icon-pack="'mdi'"
        icon="calendar-today"
        :locale="'pt-BR'"
        :first-day-of-week="0"
        editable
        @update:model-value="emit('update:modelValue', $event)"
      >
        <template v-if="showTime" #footer>
          <b-timepicker :model-value="modelValue" inline @update:model-value="emit('update:modelValue', $event)" />
        </template>
      </b-datepicker>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ modelValue: Date | null; label?: string; placeholder?: string; showTime?: boolean }>(),
  { placeholder: 'Selecione uma data', showTime: false }
)
const emit = defineEmits<{ 'update:modelValue': [value: Date | null] }>()
</script>
