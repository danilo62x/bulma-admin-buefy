<template>
  <div>
    <div class="columns">
      <div class="column is-8">

        <!-- Aparência -->
        <CardComponent title="Aparência" icon="mdi-palette">
          <b-field label="Tema">
            <div style="display: flex; gap: 0.75rem; align-items: center; padding-top: 0.25rem;">
              <b-button
                :type="!ui.darkMode ? 'is-primary' : 'is-light'"
                icon-left="weather-sunny"
                @click="ui.setDarkMode(false)"
              >Claro</b-button>
              <b-button
                :type="ui.darkMode ? 'is-primary' : 'is-light'"
                icon-left="weather-night"
                @click="ui.setDarkMode(true)"
              >Escuro</b-button>
            </div>
          </b-field>
          <hr />
          <b-field label="Tamanho da fonte">
            <b-select v-model="fontSize" @change="applyFontSize">
              <option value="13px">Pequena (13px)</option>
              <option value="14px">Normal (14px)</option>
              <option value="15px">Grande (15px)</option>
              <option value="16px">Extra grande (16px)</option>
            </b-select>
          </b-field>
        </CardComponent>

        <!-- Paletas de Cores -->
        <CardComponent title="Paletas de Cores" icon="mdi-palette-swatch" style="margin-top: 1rem;">
          <p style="font-size: 0.85rem; color: var(--tx-text-muted); margin-bottom: 1rem;">
            Aplique um conjunto de cores ao layout com um clique. Você pode ajustar individualmente depois.
          </p>
          <div class="tx-palette-grid">
            <div
              v-for="(p, idx) in PALETTES"
              :key="p.name"
              class="tx-palette-card"
              :class="{ 'is-active': activePaletteIdx === idx }"
              @click="applyPalette(idx)"
            >
              <div class="tx-palette-preview">
                <div class="tx-palette-body" :style="{ background: p.vars['--tx-primary'] }">
                  <span v-if="activePaletteIdx === idx" class="tx-palette-check">✓</span>
                </div>
                <div class="tx-palette-sidebar-strip" :style="{ background: p.vars['--tx-sidebar-bg'] }">
                  <span v-for="i in 3" :key="i" class="tx-palette-line"></span>
                </div>
              </div>
              <div class="tx-palette-name">{{ p.name }}</div>
            </div>
          </div>
        </CardComponent>

        <!-- Personalização Avançada -->
        <CardComponent title="Personalização Avançada" icon="mdi-tune" style="margin-top: 1rem;">
          <p style="font-size: 0.85rem; color: var(--tx-text-muted); margin-bottom: 0.5rem;">
            Ajuste cada variável de cor individualmente para criar seu tema exclusivo.
          </p>
          <div v-for="(defs, groupName) in themeGroups" :key="groupName" class="tx-color-group">
            <div class="tx-color-group-label">{{ groupName }}</div>
            <div v-for="def in defs" :key="def.key" class="tx-color-row">
              <span class="tx-color-label">{{ def.label }}</span>
              <div class="tx-color-swatch" :style="{ background: getThemeVar(def.key) }"></div>
              <input
                type="color"
                :value="getThemeVar(def.key)"
                class="tx-color-picker"
                @input="onColorChange(def.key, $event)"
              />
              <code class="tx-color-hex">{{ getThemeVar(def.key) }}</code>
            </div>
          </div>
          <div class="tx-reset-bar">
            <b-button type="is-light" icon-left="restore" size="is-small" @click="resetTheme">
              Restaurar padrões
            </b-button>
            <span class="tx-reset-hint">Remove todas as customizações e restaura as cores originais</span>
          </div>
        </CardComponent>

        <!-- Layout -->
        <CardComponent title="Layout" icon="mdi-view-dashboard-edit" style="margin-top: 1rem;">
          <b-field label="Largura do menu lateral">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--tx-text-muted);">
                <span>160px</span>
                <span style="font-weight: 600; color: var(--tx-text);">{{ ui.sidebarWidth }}px</span>
                <span>400px</span>
              </div>
              <input
                type="range"
                min="160"
                max="400"
                step="5"
                :value="ui.sidebarWidth"
                style="width: 100%; accent-color: var(--tx-primary);"
                @input="(e) => ui.setSidebarWidth(Number((e.target as HTMLInputElement).value))"
              />
              <div style="font-size: 0.78rem; color: var(--tx-text-muted); margin-top: 0.5rem;">
                O ajuste é aplicado em tempo real no menu lateral.
              </div>
            </div>
          </b-field>
          <hr />
          <b-field label="Menu lateral">
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <b-switch v-model="ui.sidebarCollapsed" type="is-primary">
                {{ ui.sidebarCollapsed ? 'Compactado (apenas ícones)' : 'Expandido' }}
              </b-switch>
            </div>
          </b-field>
        </CardComponent>

        <!-- Conta -->
        <CardComponent title="Conta" icon="mdi-account-cog" style="margin-top: 1rem;">
          <form @submit.prevent="saveAccount">
            <div class="columns is-multiline">
              <div class="column is-6">
                <b-field label="Nome">
                  <b-input v-model="accountForm.name" icon="account" />
                </b-field>
              </div>
              <div class="column is-6">
                <b-field label="E-mail">
                  <b-input v-model="accountForm.email" type="email" icon="email" />
                </b-field>
              </div>
              <div class="column is-6">
                <b-field label="Nova senha">
                  <b-input v-model="accountForm.newPassword" type="password" icon="lock" password-reveal placeholder="Deixe em branco para manter" />
                </b-field>
              </div>
              <div class="column is-6">
                <b-field label="Confirmar senha">
                  <b-input v-model="accountForm.confirmPassword" type="password" icon="lock" password-reveal placeholder="Confirme a nova senha" />
                </b-field>
              </div>
            </div>
            <b-button native-type="submit" type="is-primary" icon-left="content-save" :loading="saving">
              Salvar configurações
            </b-button>
          </form>
        </CardComponent>

      </div>

      <!-- Right sidebar -->
      <div class="column is-4">

        <CardComponent title="Perfil" icon="mdi-account">
          <div style="text-align: center; padding: 1rem 0;">
            <div
              style="width: 72px; height: 72px; border-radius: 50%; background: var(--tx-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 2rem; font-weight: 700; color: white;"
            >{{ userInitials }}</div>
            <div style="font-size: 1.1rem; font-weight: 600; color: var(--tx-text);">{{ auth.user?.name }}</div>
            <div style="font-size: 0.85rem; color: var(--tx-text-muted); margin-top: 0.25rem;">{{ auth.user?.email }}</div>
            <span class="tag is-primary is-light" style="margin-top: 0.5rem;">{{ auth.user?.role }}</span>
          </div>
        </CardComponent>

        <CardComponent title="Preview do Tema" icon="mdi-eye" style="margin-top: 1rem;">
          <div class="tx-theme-preview">
            <div class="tx-theme-preview-sidebar" :style="{ background: getThemeVar('--tx-sidebar-bg') }">
              <div
                v-for="i in 4"
                :key="i"
                class="tx-theme-preview-dot"
                :style="{ background: i === 1 ? getThemeVar('--tx-primary') : 'rgba(255,255,255,0.2)' }"
              ></div>
            </div>
            <div class="tx-theme-preview-body" :style="{ background: getThemeVar('--tx-body-bg') }">
              <div
                class="tx-theme-preview-header"
                :style="{ background: getThemeVar('--tx-header-bg'), borderBottomColor: getThemeVar('--tx-header-border') }"
              ></div>
              <div class="tx-theme-preview-content">
                <div class="tx-theme-preview-card" :style="{ background: getThemeVar('--tx-card-bg') }"></div>
                <div class="tx-theme-preview-card" :style="{ background: getThemeVar('--tx-card-bg') }"></div>
                <div class="tx-theme-preview-btn" :style="{ background: getThemeVar('--tx-primary') }"></div>
              </div>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: var(--tx-text); line-height: 1.8; margin-top: 0.75rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--tx-text-muted);">Largura do menu:</span>
              <strong>{{ ui.sidebarWidth }}px</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--tx-text-muted);">Estado:</span>
              <strong>{{ ui.sidebarCollapsed ? 'Compactado' : 'Expandido' }}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--tx-text-muted);">Tema:</span>
              <strong>{{ ui.darkMode ? 'Escuro' : 'Claro' }}</strong>
            </div>
          </div>
        </CardComponent>

        <CardComponent title="Sobre o Template" icon="mdi-information" style="margin-top: 1rem;">
          <div style="font-size: 0.8rem; color: var(--tx-text-muted); line-height: 1.8;">
            <div><strong style="color: var(--tx-text);">Vue 3</strong> + Composition API</div>
            <div><strong style="color: var(--tx-text);">Bulma 1.0</strong> + Buefy 3.0</div>
            <div><strong style="color: var(--tx-text);">Pinia</strong> + Vue Router 4</div>
            <div><strong style="color: var(--tx-text);">Vite 6</strong> + TypeScript 5</div>
          </div>
        </CardComponent>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
const auth = useAuthStore()
const saving = ref(false)
const fontSize = ref('14px')
const activePaletteIdx = ref(-1)

onMounted(() => ui.setPageTitle('Configurações'))

// ---- Palettes ----
interface Palette {
  name: string
  vars: Record<string, string>
}

const PALETTES: Palette[] = [
  { name: 'Azul Clássico',     vars: { '--tx-primary': '#485fc7', '--tx-sidebar-bg': '#2c3e50' } },
  { name: 'Verde Esmeralda',   vars: { '--tx-primary': '#00a878', '--tx-sidebar-bg': '#1a3a2a' } },
  { name: 'Roxo Profissional', vars: { '--tx-primary': '#7c3aed', '--tx-sidebar-bg': '#1e1b4b' } },
  { name: 'Laranja Vibrante',  vars: { '--tx-primary': '#ea580c', '--tx-sidebar-bg': '#1c1917' } },
  { name: 'Rosa Elegante',     vars: { '--tx-primary': '#db2777', '--tx-sidebar-bg': '#2d1b35' } },
  { name: 'Teal Moderno',      vars: { '--tx-primary': '#0d9488', '--tx-sidebar-bg': '#134e4a' } },
]

function applyPalette(idx: number) {
  activePaletteIdx.value = idx
  for (const [key, val] of Object.entries(PALETTES[idx].vars)) {
    ui.setThemeVar(key, val)
  }
}

// ---- Theme var definitions ----
type ThemeVarDef = { key: string; label: string; group: string }

const THEME_VAR_DEFS: ThemeVarDef[] = [
  { key: '--tx-primary',            label: 'Cor Principal',   group: 'Cores Principais' },
  { key: '--tx-success',            label: 'Sucesso',          group: 'Cores Principais' },
  { key: '--tx-warning',            label: 'Aviso',            group: 'Cores Principais' },
  { key: '--tx-danger',             label: 'Perigo',           group: 'Cores Principais' },
  { key: '--tx-info',               label: 'Informação',       group: 'Cores Principais' },
  { key: '--tx-sidebar-bg',         label: 'Fundo',            group: 'Sidebar' },
  { key: '--tx-sidebar-text',       label: 'Texto',            group: 'Sidebar' },
  { key: '--tx-sidebar-text-muted', label: 'Texto Secundário', group: 'Sidebar' },
  { key: '--tx-body-bg',            label: 'Fundo da Página',  group: 'Layout' },
  { key: '--tx-header-bg',          label: 'Header',           group: 'Layout' },
  { key: '--tx-card-bg',            label: 'Cards',            group: 'Layout' },
  { key: '--tx-header-border',      label: 'Borda do Header',  group: 'Layout' },
  { key: '--tx-border',             label: 'Bordas',           group: 'Layout' },
  { key: '--tx-text-heading',       label: 'Títulos',          group: 'Tipografia' },
  { key: '--tx-text',               label: 'Texto Principal',  group: 'Tipografia' },
  { key: '--tx-text-muted',         label: 'Texto Secundário', group: 'Tipografia' },
]

const THEME_DEFAULTS: Record<string, string> = {
  '--tx-primary':            '#485fc7',
  '--tx-success':            '#48c774',
  '--tx-warning':            '#f59e0b',
  '--tx-danger':             '#f14668',
  '--tx-info':               '#3273dc',
  '--tx-sidebar-bg':         '#2c3e50',
  '--tx-sidebar-text':       '#ecf0f1',
  '--tx-sidebar-text-muted': '#95a5a6',
  '--tx-body-bg':            '#f5f5f5',
  '--tx-header-bg':          '#ffffff',
  '--tx-card-bg':            '#ffffff',
  '--tx-header-border':      '#e0e0e0',
  '--tx-border':             '#dbdbdb',
  '--tx-text-heading':       '#1a1a2a',
  '--tx-text':               '#363636',
  '--tx-text-muted':         '#7a7a7a',
}

const themeGroups: Record<string, ThemeVarDef[]> = {}
for (const def of THEME_VAR_DEFS) {
  if (!themeGroups[def.group]) themeGroups[def.group] = []
  themeGroups[def.group].push(def)
}

function getThemeVar(key: string): string {
  return ui.customTheme[key] ?? THEME_DEFAULTS[key] ?? '#000000'
}

function onColorChange(key: string, e: Event) {
  activePaletteIdx.value = -1
  ui.setThemeVar(key, (e.target as HTMLInputElement).value)
}

function resetTheme() {
  ui.resetThemeVars()
  activePaletteIdx.value = -1
}

function applyFontSize() {
  document.documentElement.style.fontSize = fontSize.value
}

const userInitials = computed(() => {
  if (!auth.user?.name) return '?'
  return auth.user.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
})

const accountForm = reactive({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
  newPassword: '',
  confirmPassword: '',
})

async function saveAccount() {
  if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
    ui.notifyError('As senhas não coincidem!')
    return
  }
  saving.value = true
  await new Promise((r) => setTimeout(r, 600))
  if (auth.user) {
    auth.user.name = accountForm.name
    auth.user.email = accountForm.email
  }
  saving.value = false
  accountForm.newPassword = ''
  accountForm.confirmPassword = ''
  ui.notifySuccess('Configurações salvas com sucesso!')
}
</script>

<style scoped>
/* ---- Palette grid ---- */
.tx-palette-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.tx-palette-card {
  border: 2px solid var(--tx-border);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
  background: var(--tx-card-bg);
}

.tx-palette-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.tx-palette-card.is-active {
  border-color: var(--tx-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--tx-primary) 25%, transparent);
}

.tx-palette-preview {
  display: flex;
  height: 64px;
}

.tx-palette-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tx-palette-check {
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.tx-palette-sidebar-strip {
  width: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 0;
}

.tx-palette-line {
  display: block;
  width: 12px;
  height: 3px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 2px;
}

.tx-palette-name {
  padding: 0.35rem 0.5rem;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--tx-text);
  text-align: center;
  background: var(--tx-card-bg);
}

/* ---- Color customization ---- */
.tx-color-group {
  margin-bottom: 0.25rem;
}

.tx-color-group-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--tx-text-muted);
  padding: 0.75rem 0 0.3rem;
  border-bottom: 1px solid var(--tx-border-subtle);
  margin-bottom: 0.2rem;
}

.tx-color-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--tx-border-subtle);
}

.tx-color-row:last-child {
  border-bottom: none;
}

.tx-color-label {
  flex: 1;
  font-size: 0.83rem;
  color: var(--tx-text);
}

.tx-color-swatch {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid var(--tx-border);
  flex-shrink: 0;
}

.tx-color-picker {
  width: 32px;
  height: 26px;
  border: 1px solid var(--tx-border);
  border-radius: 5px;
  cursor: pointer;
  padding: 2px;
  background: transparent;
  flex-shrink: 0;
}

.tx-color-hex {
  font-size: 0.73rem;
  color: var(--tx-text-muted);
  font-family: 'Courier New', monospace;
  min-width: 5em;
  flex-shrink: 0;
}

.tx-reset-bar {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--tx-border);
}

.tx-reset-hint {
  font-size: 0.78rem;
  color: var(--tx-text-muted);
  margin-left: 0.75rem;
}

/* ---- Theme mini preview ---- */
.tx-theme-preview {
  display: flex;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--tx-border);
}

.tx-theme-preview-sidebar {
  width: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 5px;
}

.tx-theme-preview-dot {
  width: 14px;
  height: 5px;
  border-radius: 3px;
}

.tx-theme-preview-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tx-theme-preview-header {
  height: 16px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.tx-theme-preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
}

.tx-theme-preview-card {
  flex: 1;
  height: 26px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.tx-theme-preview-btn {
  width: 22px;
  height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}
</style>
