<template>
  <header class="tx-lp-nav" :class="{ 'is-scrolled': scrolled }">
    <div class="container tx-lp-nav-inner">
      <button type="button" class="tx-lp-brand" @click="scrollTo('hero')">
        <span class="tx-lp-brand-logo">A</span>
        <span class="tx-lp-brand-name">Admin Template</span>
      </button>

      <nav class="tx-lp-nav-links is-hidden-touch">
        <button
          v-for="link in LINKS"
          :key="link.id"
          type="button"
          class="tx-lp-nav-link"
          @click="scrollTo(link.id)"
        >
          {{ link.label }}
        </button>
      </nav>

      <div class="tx-lp-nav-actions">
        <button
          type="button"
          class="button is-ghost tx-lp-icon-btn"
          aria-label="Alternar tema"
          @click="ui.toggleDarkMode()"
        >
          <span class="mdi" :class="ui.darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
        </button>

        <LanguageSwitcher />

        <RouterLink to="/login" class="button is-ghost is-hidden-mobile tx-lp-login">
          Entrar
        </RouterLink>
        <RouterLink to="/register" class="button is-primary is-hidden-mobile">
          Começar agora
        </RouterLink>

        <button
          type="button"
          class="button is-ghost tx-lp-icon-btn is-hidden-desktop"
          aria-label="Abrir menu"
          :aria-expanded="open"
          @click="open = !open"
        >
          <span class="mdi" :class="open ? 'mdi-close' : 'mdi-menu'" />
        </button>
      </div>
    </div>

    <div v-if="open" class="tx-lp-mobile-menu is-hidden-desktop">
      <div class="container">
        <button
          v-for="link in LINKS"
          :key="link.id"
          type="button"
          class="tx-lp-mobile-link"
          @click="scrollTo(link.id)"
        >
          {{ link.label }}
        </button>
        <div class="tx-lp-mobile-cta">
          <RouterLink to="/login" class="button is-light is-fullwidth" @click="open = false">
            Entrar
          </RouterLink>
          <RouterLink to="/register" class="button is-primary is-fullwidth" @click="open = false">
            Começar agora
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const LINKS = [
  { id: 'features', label: 'Recursos' },
  { id: 'pricing', label: 'Preços' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contato' },
]

const ui = useUiStore()
const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function scrollTo(id: string) {
  open.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.tx-lp-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid transparent;
  transition: background-color var(--tx-transition), border-color var(--tx-transition), box-shadow var(--tx-transition);
}
.tx-lp-nav.is-scrolled {
  background: color-mix(in srgb, var(--tx-card-bg) 85%, transparent);
  backdrop-filter: blur(10px);
  border-bottom-color: var(--tx-border);
  box-shadow: var(--tx-header-shadow);
}
.tx-lp-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.tx-lp-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.tx-lp-brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 12px;
  background: var(--tx-primary);
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--tx-primary) 35%, transparent);
}
.tx-lp-brand-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--tx-text-heading);
}
.tx-lp-nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.tx-lp-nav-link {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.85rem;
  border-radius: var(--tx-radius);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--tx-text);
  transition: background-color var(--tx-transition), color var(--tx-transition);
}
.tx-lp-nav-link:hover {
  background: var(--tx-border-subtle);
  color: var(--tx-text-heading);
}
.tx-lp-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tx-lp-icon-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid var(--tx-border);
  padding: 0;
}
.tx-lp-icon-btn .mdi {
  font-size: 1.2rem;
}
.tx-lp-login {
  color: var(--tx-text);
}
.tx-lp-mobile-menu {
  background: var(--tx-card-bg);
  border-top: 1px solid var(--tx-border);
  padding: 1rem 0;
}
.tx-lp-mobile-link {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.7rem 1rem;
  border-radius: var(--tx-radius);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--tx-text);
}
.tx-lp-mobile-link:hover {
  background: var(--tx-border-subtle);
}
.tx-lp-mobile-cta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.75rem 1rem 0;
  border-top: 1px solid var(--tx-border);
}
</style>
