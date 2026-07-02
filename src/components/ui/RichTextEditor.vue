<template>
  <div class="tx-rte box" style="padding: 0;">
    <div v-if="editor" class="tx-rte-toolbar">
      <div class="buttons has-addons" style="margin: 0;">
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()"><strong>B</strong></button>
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()"><em>I</em></button>
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()"><s>S</s></button>
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">&lt;/&gt;</button>
      </div>
      <div class="buttons has-addons" style="margin: 0 0 0 0.5rem;">
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">H1</button>
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">❝</button>
      </div>
      <div class="buttons has-addons" style="margin: 0 0 0 0.5rem;">
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()"><span class="mdi mdi-format-list-bulleted" /></button>
        <button type="button" class="button is-small" :class="{ 'is-primary is-light': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()"><span class="mdi mdi-format-list-numbered" /></button>
      </div>
    </div>
    <editor-content :editor="editor" class="tx-rte-content content" />
  </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = withDefaults(defineProps<{ modelValue?: string; placeholder?: string }>(), { modelValue: '<p></p>' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  editorProps: { attributes: { class: 'tx-rte-editable' } },
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})

watch(
  () => props.modelValue,
  (val) => {
    if (editor.value && val !== editor.value.getHTML()) editor.value.commands.setContent(val, { emitUpdate: false })
  }
)

onBeforeUnmount(() => editor.value?.destroy())
</script>

<style scoped>
.tx-rte-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--tx-border, #e4e7ec);
}
.tx-rte-content {
  min-height: 10rem;
  padding: 0.75rem 1rem;
}
:deep(.tx-rte-editable:focus) {
  outline: none;
}
</style>
