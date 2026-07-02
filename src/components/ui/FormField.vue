<template>
  <!-- Checkbox variant -->
  <div v-if="as === 'checkbox'" class="field">
    <label class="checkbox">
      <input type="checkbox" :checked="checked" @change="handleChange(($event.target as HTMLInputElement).checked)" @blur="handleBlur" />
      {{ label }}
    </label>
    <p v-if="hasError" class="help is-danger">{{ errorMessage }}</p>
  </div>

  <!-- Standard field -->
  <div v-else class="field">
    <label v-if="label" class="label" :for="id">{{ label }}</label>
    <div class="control" :class="{ 'has-icons-left': icon }">
      <span v-if="icon" class="icon is-left"><i class="mdi" :class="icon" /></span>

      <span v-if="as === 'select'" class="select is-fullwidth" :class="{ 'is-danger': hasError }">
        <select :id="id" :value="value" @change="handleChange(($event.target as HTMLSelectElement).value)" @blur="handleBlur">
          <slot />
        </select>
      </span>

      <textarea
        v-else-if="as === 'textarea'"
        :id="id"
        class="textarea"
        :class="{ 'is-danger': hasError }"
        :value="value as string"
        :rows="rows"
        :placeholder="placeholder"
        @input="handleChange(($event.target as HTMLTextAreaElement).value)"
        @blur="handleBlur"
      />

      <input
        v-else
        :id="id"
        class="input"
        :class="{ 'is-danger': hasError }"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="handleChange(($event.target as HTMLInputElement).value)"
        @blur="handleBlur"
      />
    </div>
    <p v-if="hasError" class="help is-danger">{{ errorMessage }}</p>
    <p v-else-if="hint" class="help">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    name: string
    label?: string
    as?: 'input' | 'textarea' | 'select' | 'checkbox'
    type?: string
    placeholder?: string
    hint?: string
    icon?: string
    rows?: number
  }>(),
  { as: 'input', type: 'text', rows: 4 }
)

const id = `f-${props.name}`
const isCheckbox = props.as === 'checkbox'

const { value, checked, errorMessage, handleChange, handleBlur, meta } = useField(
  () => props.name,
  undefined,
  isCheckbox ? { type: 'checkbox', checkedValue: true, uncheckedValue: false } : {}
)

const hasError = computed(() => Boolean(meta.touched && errorMessage.value))
</script>
