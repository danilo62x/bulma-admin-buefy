<template>
  <header class="tx-header">
    <div class="tx-header-left">
      <!-- Mobile toggle -->
      <button
        class="button is-ghost tx-icon-btn is-hidden-desktop"
        @click="ui.toggleSidebarMobile()"
      >
        <span class="mdi mdi-menu" />
      </button>

      <!-- Desktop collapse toggle -->
      <button
        class="button is-ghost tx-icon-btn is-hidden-touch"
        @click="ui.toggleSidebar()"
      >
        <span
          class="mdi"
          :class="ui.sidebarCollapsed ? 'mdi-menu-open' : 'mdi-menu'"
        />
      </button>

      <span class="tx-page-title">{{ ui.pageTitle }}</span>
    </div>

    <div class="tx-header-right">
      <!-- Language switcher -->
      <LanguageSwitcher />

      <!-- Dark mode toggle -->
      <button
        class="button is-ghost tx-icon-btn"
        :title="ui.darkMode ? 'Modo claro' : 'Modo escuro'"
        @click="ui.toggleDarkMode()"
      >
        <span
          class="mdi"
          :class="ui.darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        />
      </button>

      <!-- Notifications -->
      <b-dropdown aria-role="list" position="is-bottom-left">
        <template #trigger>
          <button class="button is-ghost tx-icon-btn tx-icon-btn-notif">
            <span class="mdi mdi-bell" />
            <span
              v-if="unreadCount > 0"
              class="tag is-danger is-rounded tx-notif-badge"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>
        </template>

        <div class="tx-dropdown-panel" style="min-width: 300px;">
          <div class="tx-dropdown-header">Notificações</div>
          <b-dropdown-item
            v-for="notif in mockNotifications"
            :key="notif.id"
            aria-role="listitem"
          >
            <div class="tx-notif-item">
              <span
                class="mdi tx-notif-icon"
                :class="notif.icon"
                :style="{ color: notif.color }"
              />
              <div>
                <div class="tx-notif-title">{{ notif.title }}</div>
                <div class="tx-notif-time">{{ notif.time }}</div>
              </div>
            </div>
          </b-dropdown-item>
          <div class="tx-dropdown-footer">
            <a>Ver todas as notificações</a>
          </div>
        </div>
      </b-dropdown>

      <!-- User dropdown -->
      <b-dropdown aria-role="list" position="is-bottom-left">
        <template #trigger>
          <button class="button is-ghost tx-user-trigger">
            <div class="tx-user-avatar">{{ userInitials }}</div>
            <span class="tx-user-name-text is-hidden-touch">{{ auth.user?.name }}</span>
            <span class="mdi mdi-chevron-down is-hidden-touch" style="font-size: 1rem; color: var(--tx-text-muted);" />
          </button>
        </template>

        <div class="tx-dropdown-panel" style="min-width: 220px;">
          <div class="tx-user-info">
            <div class="tx-user-name">{{ auth.user?.name }}</div>
            <div class="tx-user-email">{{ auth.user?.email }}</div>
            <span class="tag is-light is-small tx-user-role">{{ auth.user?.role }}</span>
          </div>

          <b-dropdown-item aria-role="listitem" @click="router.push('/settings')">
            <span class="mdi mdi-cog" style="margin-right: 0.5rem;" />
            Configurações
          </b-dropdown-item>

          <b-dropdown-item aria-role="listitem" @click="ui.openCookieBanner()">
            <span class="mdi mdi-cookie" style="margin-right: 0.5rem;" />
            Política de Cookies
          </b-dropdown-item>

          <b-dropdown-item aria-role="listitem" @click="showClearDataModal = true">
            <span class="mdi mdi-broom" style="margin-right: 0.5rem;" />
            Limpar dados do navegador
          </b-dropdown-item>

          <hr class="dropdown-divider" />

          <b-dropdown-item aria-role="listitem" class="has-text-danger" @click="handleLogout">
            <span class="mdi mdi-logout" style="margin-right: 0.5rem;" />
            Sair
          </b-dropdown-item>
        </div>
      </b-dropdown>
    </div>

    <!-- Confirmação: limpar dados do navegador -->
    <b-modal v-model:modelValue="showClearDataModal" has-modal-card trap-focus>
      <div class="modal-card" style="width: 440px; max-width: 100%;">
        <header class="modal-card-head">
          <p class="modal-card-title">Limpar dados do navegador</p>
        </header>
        <section class="modal-card-body">
          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <span
              class="mdi mdi-alert-circle"
              style="font-size: 2rem; color: var(--tx-warning); flex-shrink: 0;"
            />
            <div>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--tx-text-heading);">
                Esta ação não pode ser desfeita.
              </p>
              <p style="font-size: 0.875rem; color: var(--tx-text-muted); margin-top: 0.5rem;">
                Todos os dados salvos localmente serão removidos: sessão, tema, preferências de
                layout, paletas customizadas e aceite de cookies. Você será desconectado e a
                página será recarregada.
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot tx-modal-foot">
          <b-button @click="showClearDataModal = false">Cancelar</b-button>
          <b-button type="is-danger" icon-left="broom" @click="handleClearData">
            Limpar tudo
          </b-button>
        </footer>
      </div>
    </b-modal>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const ui = useUiStore()
const auth = useAuthStore()
const router = useRouter()

const showClearDataModal = ref(false)

const userInitials = computed(() => {
  if (!auth.user?.name) return '?'
  return auth.user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
})

const unreadCount = 3

const mockNotifications = [
  { id: 1, title: 'Novo usuário cadastrado', icon: 'mdi-account-plus', color: '#48c774', time: '2 min atrás' },
  { id: 2, title: 'Relatório mensal disponível', icon: 'mdi-file-chart', color: '#3273dc', time: '1 hora atrás' },
  { id: 3, title: 'Atualização do sistema', icon: 'mdi-update', color: '#f59e0b', time: '3 horas atrás' },
]

function handleLogout() {
  auth.logout()
  router.push('/login')
}

function handleClearData() {
  // Limpa todo o storage do navegador para este origin
  try {
    localStorage.clear()
    sessionStorage.clear()
  } catch (_) {
    // ignora bloqueios de storage
  }
  showClearDataModal.value = false
  // Reload completo para reinicializar todas as stores e tema
  window.location.href = '/login'
}
</script>
