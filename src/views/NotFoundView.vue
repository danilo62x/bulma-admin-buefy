<template>
  <div class="tx-state-page">
    <div class="tx-state-bg">
      <span class="tx-state-blob tx-state-blob--one" />
      <span class="tx-state-blob tx-state-blob--two" />
    </div>

    <div class="tx-state-content has-text-centered">
      <span class="tx-state-404">404</span>

      <h1 class="title is-2 has-text-white mt-4">Página não encontrada</h1>

      <p class="subtitle is-6 tx-state-text mt-3">
        A página que você está procurando não existe, foi removida ou mudou de endereço.
        Verifique o link ou volte para um lugar seguro.
      </p>

      <div class="buttons is-centered mt-5">
        <RouterLink to="/" class="button is-primary is-medium">
          <span class="icon"><span class="mdi mdi-arrow-left" /></span>
          <span>Voltar ao início</span>
        </RouterLink>
        <RouterLink to="/dashboard" class="button is-light is-medium">
          <span class="icon"><span class="mdi mdi-view-dashboard" /></span>
          <span>Ir para o dashboard</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Não encontrado'))
</script>

<style scoped>
.tx-state-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.tx-state-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.tx-state-blob {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 9999px;
  filter: blur(80px);
}

.tx-state-blob--one {
  top: -8rem;
  right: -8rem;
  background: color-mix(in srgb, var(--tx-primary) 35%, transparent);
}

.tx-state-blob--two {
  bottom: -8rem;
  left: -8rem;
  background: color-mix(in srgb, var(--tx-warning, #ffdd57) 25%, transparent);
}

.tx-state-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 34rem;
}

.tx-state-404 {
  display: block;
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  color: var(--tx-primary);
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.tx-state-text {
  margin-left: auto;
  margin-right: auto;
  max-width: 28rem;
  color: rgba(255, 255, 255, 0.75) !important;
}

@media screen and (max-width: 768px) {
  .tx-state-404 {
    font-size: 6rem;
  }
}
</style>
