<template>
  <section id="contact" class="section tx-lp-section tx-lp-section-alt">
    <div class="container">
      <div class="tx-lp-head">
        <span class="tx-lp-eyebrow">Contato</span>
        <h2 class="title tx-lp-head-title">Fale com a gente</h2>
        <p class="subtitle tx-lp-head-sub">
          Tem dúvidas? Envie uma mensagem e nossa equipe responde rapidinho.
        </p>
      </div>

      <div class="columns is-variable is-6 tx-lp-grid">
        <!-- Info -->
        <div class="column is-5 tx-lp-contact-info">
          <div v-for="item in INFO" :key="item.label" class="tx-lp-info-item">
            <span class="tx-lp-info-icon">
              <span class="mdi" :class="item.icon" />
            </span>
            <div>
              <p class="tx-lp-info-label">{{ item.label }}</p>
              <p class="tx-lp-info-value">{{ item.value }}</p>
            </div>
          </div>

          <div class="card tx-lp-info-card">
            <div class="tx-lp-info-card-head">
              <span class="mdi mdi-check" />
              <p>Resposta em até 24h</p>
            </div>
            <p class="tx-lp-info-card-text">
              Atendimento de segunda a sexta, das 9h às 18h (horário de Brasília).
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="column is-7">
          <form class="card tx-lp-form" @submit.prevent="handleSubmit">
            <b-field label="Nome">
              <b-input v-model="nome" type="text" placeholder="Seu nome" required expanded />
            </b-field>

            <b-field label="Email">
              <b-input v-model="email" type="email" placeholder="seu@email.com" required expanded />
            </b-field>

            <b-field label="Mensagem">
              <b-input
                v-model="mensagem"
                type="textarea"
                :rows="4"
                placeholder="Como podemos ajudar?"
                required
              />
            </b-field>

            <b-button native-type="submit" type="is-primary" icon-left="email" expanded>
              Enviar mensagem
            </b-button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const INFO = [
  { icon: 'mdi-email', label: 'Email', value: 'contato@template.com' },
  { icon: 'mdi-phone', label: 'Telefone', value: '+55 (11) 4002-8922' },
  { icon: 'mdi-map-marker', label: 'Endereço', value: 'Av. Paulista, 1000 — São Paulo, SP' },
]

const ui = useUiStore()
const nome = ref('')
const email = ref('')
const mensagem = ref('')

function handleSubmit() {
  ui.notifySuccess('Mensagem enviada!')
  nome.value = ''
  email.value = ''
  mensagem.value = ''
}
</script>

<style scoped>
.tx-lp-section {
  scroll-margin-top: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.tx-lp-section-alt {
  background: var(--tx-body-bg);
}
.tx-lp-head {
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
}
.tx-lp-eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--tx-primary);
}
.tx-lp-head-title {
  margin-top: 0.5rem;
  font-size: 2rem;
  font-weight: 800;
  color: var(--tx-text-heading);
}
.tx-lp-head-sub {
  margin-top: 1rem;
  font-size: 1.05rem;
  color: var(--tx-text-muted);
}
.tx-lp-grid {
  margin-top: 2.5rem;
}
.tx-lp-contact-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}
.tx-lp-info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.tx-lp-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--tx-primary) 12%, transparent);
  color: var(--tx-primary);
  font-size: 1.35rem;
}
.tx-lp-info-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--tx-text-heading);
}
.tx-lp-info-value {
  margin-top: 0.15rem;
  font-size: 0.9rem;
  color: var(--tx-text-muted);
}
.tx-lp-info-card {
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: none;
}
.tx-lp-info-card-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--tx-success);
}
.tx-lp-info-card-head .mdi {
  font-size: 1.15rem;
}
.tx-lp-info-card-head p {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--tx-text-heading);
}
.tx-lp-info-card-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--tx-text-muted);
}
.tx-lp-form {
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
}
.tx-lp-form .field:not(:last-child) {
  margin-bottom: 1.25rem;
}
</style>
