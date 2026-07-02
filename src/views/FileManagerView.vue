<template>
  <div>
    <!-- Toolbar -->
    <div class="tx-fm-toolbar">
      <nav class="breadcrumb is-small" aria-label="breadcrumbs" style="margin-bottom: 0;">
        <ul>
          <li><a>Início</a></li>
          <li class="is-active"><a aria-current="page">Meus arquivos</a></li>
        </ul>
      </nav>
      <div class="tx-fm-actions">
        <div class="buttons has-addons" style="margin-bottom: 0;">
          <b-button
            size="is-small"
            :type="view === 'grid' ? 'is-primary' : 'is-light'"
            icon-left="view-grid"
            aria-label="Visualização em grade"
            @click="view = 'grid'"
          />
          <b-button
            size="is-small"
            :type="view === 'list' ? 'is-primary' : 'is-light'"
            icon-left="view-list"
            aria-label="Visualização em lista"
            @click="view = 'list'"
          />
        </div>
        <b-button type="is-primary" icon-left="plus" @click="uploadOpen = true">
          Enviar arquivo
        </b-button>
      </div>
    </div>

    <!-- Storage usage -->
    <div class="box tx-storage">
      <div class="tx-storage-head">
        <div class="tx-storage-info">
          <span class="tx-storage-icon">
            <span class="mdi mdi-database" />
          </span>
          <div>
            <p class="has-text-weight-semibold" style="color: var(--tx-text-heading);">Armazenamento</p>
            <p class="is-size-7 has-text-grey">{{ usedGb }} GB de {{ totalGb }} GB utilizados</p>
          </div>
        </div>
        <span class="has-text-weight-semibold" style="color: var(--tx-text-heading);">{{ usedPct }}%</span>
      </div>
      <b-progress
        :value="usedPct"
        :type="usedPct > 80 ? 'is-danger' : 'is-primary'"
        size="is-medium"
        style="margin-top: 1rem;"
      />
    </div>

    <!-- Folders -->
    <h2 class="tx-fm-section-title">Pastas</h2>
    <div class="columns is-multiline">
      <div v-for="f in FOLDERS" :key="f.id" class="column is-3-desktop is-6-tablet">
        <div class="box tx-folder-card">
          <span class="tx-folder-icon">
            <span class="mdi mdi-folder" />
          </span>
          <div class="tx-folder-meta">
            <p class="has-text-weight-medium tx-truncate" style="color: var(--tx-text-heading);">{{ f.name }}</p>
            <p class="is-size-7 has-text-grey">{{ f.items }} itens · {{ f.modified }}</p>
          </div>
          <b-dropdown aria-role="menu" position="is-bottom-left">
            <template #trigger>
              <b-button size="is-small" type="is-light" icon-left="dots-vertical" aria-label="Opções" />
            </template>
            <b-dropdown-item
              v-for="a in MENU_ACTIONS"
              :key="a.label"
              aria-role="menuitem"
              :class="{ 'has-text-danger': a.danger }"
              @click="onAction(a.label)"
            >
              <span class="mdi" :class="a.icon" style="margin-right: 0.4rem;" />
              {{ a.label }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <!-- Files -->
    <h2 class="tx-fm-section-title">Arquivos</h2>

    <div v-if="view === 'grid'" class="columns is-multiline">
      <div v-for="file in FILES" :key="file.id" class="column is-3-desktop is-4-tablet is-6-mobile">
        <div class="box tx-file-card">
          <div class="tx-file-card-head">
            <span class="tx-file-icon" :style="{ '--icon-color': KIND_STYLE[file.kind].color }">
              <span class="mdi" :class="KIND_STYLE[file.kind].icon" />
            </span>
            <b-dropdown aria-role="menu" position="is-bottom-left">
              <template #trigger>
                <b-button size="is-small" type="is-light" icon-left="dots-vertical" aria-label="Opções" />
              </template>
              <b-dropdown-item
                v-for="a in MENU_ACTIONS"
                :key="a.label"
                aria-role="menuitem"
                :class="{ 'has-text-danger': a.danger }"
                @click="onAction(a.label)"
              >
                <span class="mdi" :class="a.icon" style="margin-right: 0.4rem;" />
                {{ a.label }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <div>
            <p class="has-text-weight-medium tx-truncate" style="color: var(--tx-text-heading);">{{ file.name }}</p>
            <p class="is-size-7 has-text-grey" style="margin-top: 0.15rem;">{{ file.size }} · {{ file.modified }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="box" style="padding: 0;">
      <table class="table is-fullwidth is-hoverable tx-file-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Modificado</th>
            <th class="has-text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in FILES" :key="file.id">
            <td>
              <div class="tx-file-row-name">
                <span class="tx-file-icon is-small" :style="{ '--icon-color': KIND_STYLE[file.kind].color }">
                  <span class="mdi" :class="KIND_STYLE[file.kind].icon" />
                </span>
                <span class="has-text-weight-medium" style="color: var(--tx-text-heading);">{{ file.name }}</span>
              </div>
            </td>
            <td class="has-text-grey">{{ file.size }}</td>
            <td class="has-text-grey">{{ file.modified }}</td>
            <td class="has-text-right">
              <b-dropdown aria-role="menu" position="is-bottom-left">
                <template #trigger>
                  <b-button size="is-small" type="is-light" icon-left="dots-vertical" aria-label="Opções" />
                </template>
                <b-dropdown-item
                  v-for="a in MENU_ACTIONS"
                  :key="a.label"
                  aria-role="menuitem"
                  :class="{ 'has-text-danger': a.danger }"
                  @click="onAction(a.label)"
                >
                  <span class="mdi" :class="a.icon" style="margin-right: 0.4rem;" />
                  {{ a.label }}
                </b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Upload modal -->
    <b-modal v-model="uploadOpen" has-modal-card trap-focus>
      <div class="modal-card" style="width: 560px; max-width: 100%;">
        <header class="modal-card-head">
          <div>
            <p class="modal-card-title">Enviar arquivos</p>
            <p class="is-size-7 has-text-grey">Arraste e solte ou selecione do seu dispositivo</p>
          </div>
          <button class="delete" @click="uploadOpen = false" />
        </header>
        <section class="modal-card-body">
          <FileDropzone :max-files="8" @files="onFiles" />
        </section>
        <footer class="modal-card-foot tx-modal-foot">
          <b-button @click="uploadOpen = false">Cancelar</b-button>
          <b-button type="is-primary" icon-left="check" @click="finishUpload">Concluir</b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import FileDropzone from '@/components/ui/FileDropzone.vue'

interface FolderItem {
  id: string
  name: string
  items: number
  modified: string
}

type FileKind = 'document' | 'image' | 'archive' | 'sheet'

interface FileItem {
  id: string
  name: string
  kind: FileKind
  size: string
  modified: string
}

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Arquivos'))

const FOLDERS: FolderItem[] = [
  { id: 'f1', name: 'Documentos', items: 24, modified: '24/05/2026' },
  { id: 'f2', name: 'Imagens', items: 132, modified: '22/05/2026' },
  { id: 'f3', name: 'Projetos', items: 9, modified: '20/05/2026' },
  { id: 'f4', name: 'Backups', items: 5, modified: '12/05/2026' },
]

const FILES: FileItem[] = [
  { id: 'a1', name: 'Proposta-comercial.pdf', kind: 'document', size: '2,4 MB', modified: 'Hoje, 09:42' },
  { id: 'a2', name: 'Relatorio-maio.xlsx', kind: 'sheet', size: '845 KB', modified: 'Ontem, 18:11' },
  { id: 'a3', name: 'Banner-home.png', kind: 'image', size: '1,1 MB', modified: 'Ontem, 14:25' },
  { id: 'a4', name: 'Apresentacao.pdf', kind: 'document', size: '5,8 MB', modified: '23/05/2026' },
  { id: 'a5', name: 'Logo-vetor.svg', kind: 'image', size: '64 KB', modified: '22/05/2026' },
  { id: 'a6', name: 'Codigo-fonte.zip', kind: 'archive', size: '18,2 MB', modified: '20/05/2026' },
]

const KIND_STYLE: Record<FileKind, { icon: string; color: string }> = {
  document: { icon: 'mdi-file-document', color: '#485fc7' },
  image: { icon: 'mdi-image', color: '#48c774' },
  archive: { icon: 'mdi-folder-zip', color: '#f59e0b' },
  sheet: { icon: 'mdi-file-table', color: '#3273dc' },
}

const view = ref<'grid' | 'list'>('grid')
const uploadOpen = ref(false)
const pendingFiles = ref<File[]>([])

const usedGb = 64.5
const totalGb = 100
const usedPct = Math.round((usedGb / totalGb) * 100)

function onFiles(list: File[]) {
  pendingFiles.value = list
}

function finishUpload() {
  uploadOpen.value = false
  const count = pendingFiles.value.length
  pendingFiles.value = []
  ui.notifySuccess(count > 0 ? `${count} arquivo${count > 1 ? 's' : ''} enviado${count > 1 ? 's' : ''} com sucesso` : 'Arquivos enviados com sucesso')
}

function onAction(label: string) {
  ui.notifySuccess(`${label} executado`)
}

const MENU_ACTIONS: { label: string; icon: string; danger?: boolean }[] = [
  { label: 'Abrir', icon: 'mdi-eye' },
  { label: 'Renomear', icon: 'mdi-pencil' },
  { label: 'Baixar', icon: 'mdi-download' },
  { label: 'Excluir', icon: 'mdi-delete', danger: true },
]
</script>

<style scoped>
.tx-fm-toolbar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}
@media (min-width: 1024px) {
  .tx-fm-toolbar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.tx-fm-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tx-storage {
  margin-bottom: 1.25rem;
}
.tx-storage-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tx-storage-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.tx-storage-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--tx-radius);
  background: rgba(72, 95, 199, 0.1);
  color: var(--tx-primary);
}
.tx-storage-icon .mdi {
  font-size: 1.25rem;
}

.tx-fm-section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--tx-text-heading);
  margin-bottom: 0.75rem;
}

.tx-folder-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0;
  transition: border-color var(--tx-transition);
}
.tx-folder-card:hover {
  border-color: var(--tx-primary);
}
.tx-folder-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--tx-radius);
  background: rgba(245, 158, 11, 0.12);
  color: var(--tx-warning);
}
.tx-folder-icon .mdi {
  font-size: 1.4rem;
}
.tx-folder-meta {
  min-width: 0;
  flex: 1;
}

.tx-file-card {
  margin-bottom: 0;
  transition: border-color var(--tx-transition);
}
.tx-file-card:hover {
  border-color: var(--tx-primary);
}
.tx-file-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.tx-file-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--tx-radius);
  color: var(--icon-color, var(--tx-primary));
  background: color-mix(in srgb, var(--icon-color, #485fc7) 12%, transparent);
}
.tx-file-icon.is-small {
  width: 2.25rem;
  height: 2.25rem;
}
.tx-file-icon .mdi {
  font-size: 1.4rem;
}

.tx-file-table th {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tx-text-muted);
}
.tx-file-row-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tx-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tx-modal-foot {
  justify-content: flex-end;
}
</style>
