<template>
  <div>
    <label
      class="tx-dropzone"
      :class="{ 'is-active': dragging }"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <input type="file" class="is-hidden" :accept="accept" multiple @change="onPick" />
      <span class="mdi mdi-cloud-upload tx-dropzone-icon" />
      <p class="has-text-weight-medium">{{ dragging ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para enviar' }}</p>
      <p class="is-size-7 has-text-grey">Até {{ maxFiles }} arquivos</p>
    </label>

    <ul v-if="files.length" style="margin-top: 0.75rem;">
      <li v-for="(file, idx) in files" :key="`${file.name}-${idx}`" class="tx-file-row">
        <span class="mdi mdi-file-outline" style="margin-right: 0.5rem;" />
        <span class="tx-file-name">{{ file.name }}</span>
        <span class="is-size-7 has-text-grey" style="margin-left: 0.5rem;">{{ formatSize(file.size) }}</span>
        <button class="delete is-small" style="margin-left: auto;" @click="remove(idx)" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{ accept?: string; maxFiles?: number }>(), { maxFiles: 5 })
const emit = defineEmits<{ files: [files: File[]] }>()

const files = ref<File[]>([])
const dragging = ref(false)

function add(list: FileList | null) {
  if (!list) return
  files.value = [...files.value, ...Array.from(list)].slice(0, props.maxFiles)
  emit('files', files.value)
}
function onDrop(e: DragEvent) {
  dragging.value = false
  add(e.dataTransfer?.files ?? null)
}
function onPick(e: Event) {
  add((e.target as HTMLInputElement).files)
}
function remove(idx: number) {
  files.value.splice(idx, 1)
  emit('files', files.value)
}
function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
</script>

<style scoped>
.tx-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  text-align: center;
  border: 2px dashed var(--tx-border, #d0d5dd);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.tx-dropzone:hover,
.tx-dropzone.is-active {
  border-color: var(--tx-primary, #485fc7);
}
.tx-dropzone-icon {
  font-size: 2rem;
  color: var(--tx-primary, #485fc7);
}
.tx-file-row {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--tx-border, #e4e7ec);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.tx-file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
