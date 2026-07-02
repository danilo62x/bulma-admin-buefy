<template>
  <transition name="cookie-slide">
    <div v-if="ui.showCookieBanner" class="tx-cookie-banner">
      <div class="tx-cookie-icon">
        <span class="mdi mdi-cookie" />
      </div>
      <div class="tx-cookie-content">
        <div class="tx-cookie-title">Aviso de Cookies</div>
        <p class="tx-cookie-text">
          Este site utiliza cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego.
          Ao continuar navegando, você concorda com a nossa
          <a href="#" @click.prevent="ui.notify('Abrindo política de privacidade...', 'is-info')">
            Política de Privacidade
          </a>.
        </p>
      </div>
      <div class="tx-cookie-actions">
        <b-button type="is-light" size="is-small" @click="ui.declineCookies()">
          Recusar
        </b-button>
        <b-button type="is-primary" size="is-small" icon-left="check" @click="ui.acceptCookies()">
          Aceitar
        </b-button>
        <button class="tx-cookie-close" aria-label="Fechar" @click="ui.closeCookieBanner()">
          <span class="mdi mdi-close" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

onMounted(() => {
  if (!ui.cookiesAccepted) {
    ui.openCookieBanner()
  }
})
</script>

<style scoped>
.tx-cookie-banner {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  max-width: 720px;
  margin: 0 auto;
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.18);
  z-index: 9998;
}

.tx-cookie-icon {
  font-size: 2rem;
  color: var(--tx-warning);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tx-cookie-content {
  flex: 1;
  min-width: 0;
}

.tx-cookie-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--tx-text-heading);
  margin-bottom: 0.2rem;
}

.tx-cookie-text {
  font-size: 0.82rem;
  color: var(--tx-text-muted);
  line-height: 1.45;
  margin: 0;
}

.tx-cookie-text a {
  color: var(--tx-primary);
  text-decoration: underline;
}

.tx-cookie-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.tx-cookie-close {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--tx-text-muted);
  font-size: 1.1rem;
  padding: 0.25rem;
  border-radius: var(--tx-radius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25rem;
}

.tx-cookie-close:hover {
  background: var(--tx-border-subtle);
  color: var(--tx-text);
}

.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 640px) {
  .tx-cookie-banner {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  .tx-cookie-actions {
    justify-content: center;
  }
}
</style>
