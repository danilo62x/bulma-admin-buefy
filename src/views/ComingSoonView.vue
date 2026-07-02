<template>
  <div class="tx-state-page">
    <div class="tx-state-bg">
      <span class="tx-state-blob tx-state-blob--one" />
      <span class="tx-state-blob tx-state-blob--two" />
    </div>

    <div class="tx-state-content has-text-centered">
      <span class="tx-state-icon">
        <span class="mdi mdi-rocket-launch mdi-48px" />
      </span>

      <h1 class="title is-2 has-text-white mt-5">Em breve</h1>

      <p class="subtitle is-6 tx-state-text mt-3">
        Estamos preparando algo incrível para você. Inscreva-se abaixo e seja o primeiro a
        saber quando lançarmos.
      </p>

      <div class="columns is-mobile is-variable is-2 tx-state-countdown mt-5">
        <div v-for="unit in units" :key="unit.label" class="column">
          <div class="box tx-state-unit">
            <span class="tx-state-unit-value">
              {{ String(unit.value).padStart(2, '0') }}
            </span>
            <span class="tx-state-unit-label">{{ unit.label }}</span>
          </div>
        </div>
      </div>

      <form class="tx-state-form mt-5" @submit.prevent="handleSubscribe">
        <div class="field has-addons">
          <p class="control has-icons-left is-expanded">
            <input
              v-model="email"
              class="input is-medium"
              type="email"
              required
              placeholder="seu@email.com"
            />
            <span class="icon is-small is-left"><span class="mdi mdi-email" /></span>
          </p>
          <p class="control">
            <button type="submit" class="button is-primary is-medium">
              <span class="icon"><span class="mdi mdi-bell" /></span>
              <span>Avise-me</span>
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useUiStore } from '@/stores/ui'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const ui = useUiStore()

// Alvo fixo: ~30 dias a partir do carregamento do componente.
const target = Date.now() + 30 * 24 * 60 * 60 * 1000

const timeLeft = ref<TimeLeft>(getTimeLeft(target))
const email = ref('')

let interval: ReturnType<typeof setInterval> | undefined

const units = computed<{ label: string; value: number }[]>(() => [
  { label: 'Dias', value: timeLeft.value.days },
  { label: 'Horas', value: timeLeft.value.hours },
  { label: 'Minutos', value: timeLeft.value.minutes },
  { label: 'Segundos', value: timeLeft.value.seconds },
])

function handleSubscribe() {
  ui.notifySuccess('Você será avisado!')
  email.value = ''
}

onMounted(() => {
  ui.setPageTitle('Em breve')
  interval = setInterval(() => {
    timeLeft.value = getTimeLeft(target)
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
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
  max-width: 36rem;
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

.tx-state-countdown {
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}

.tx-state-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: none;
}

.tx-state-unit-value {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.tx-state-unit-label {
  margin-top: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
}

.tx-state-form {
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
