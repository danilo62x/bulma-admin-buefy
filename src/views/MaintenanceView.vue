<template>
  <div class="tx-state-page">
    <div class="tx-state-bg">
      <span class="tx-state-blob tx-state-blob--one" />
      <span class="tx-state-blob tx-state-blob--two" />
    </div>

    <div class="tx-state-content has-text-centered">
      <span class="tx-state-icon">
        <span class="mdi mdi-cog mdi-48px" />
      </span>

      <h1 class="title is-2 has-text-white mt-5">Estamos em manutenção</h1>

      <p class="subtitle is-6 tx-state-text mt-3">
        Nosso sistema está passando por uma atualização programada para melhorar sua
        experiência. Voltaremos em instantes. Agradecemos a sua paciência.
      </p>

      <div class="tag is-medium tx-state-badge mt-4">
        <span class="tx-state-pulse" />
        Tempo estimado: aproximadamente 2 horas
      </div>

      <div class="mt-5">
        <RouterLink to="/" class="button is-primary is-medium">
          <span class="icon"><span class="mdi mdi-arrow-left" /></span>
          <span>Voltar ao início</span>
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
onMounted(() => ui.setPageTitle('Em manutenção'))
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

.tx-state-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background: var(--tx-primary);
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.tx-state-text {
  margin-left: auto;
  margin-right: auto;
  max-width: 28rem;
  color: rgba(255, 255, 255, 0.75) !important;
}

.tx-state-badge {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  gap: 0.5rem;
}

.tx-state-pulse {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--tx-warning, #ffdd57);
  animation: tx-state-pulse 1.4s ease-in-out infinite;
}

@keyframes tx-state-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
