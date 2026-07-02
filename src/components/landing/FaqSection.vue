<template>
  <section id="faq" class="section tx-lp-section">
    <div class="container tx-lp-faq-container">
      <div class="tx-lp-head">
        <span class="tx-lp-eyebrow">FAQ</span>
        <h2 class="title tx-lp-head-title">Perguntas frequentes</h2>
        <p class="subtitle tx-lp-head-sub">Tudo o que você precisa saber antes de começar.</p>
      </div>

      <div class="tx-lp-faq-list">
        <b-collapse
          v-for="(item, i) in FAQ"
          :key="item.q"
          :model-value="open === i"
          class="tx-lp-faq-item"
          animation="slide"
          @update:model-value="(v: boolean) => (open = v ? i : (open === i ? -1 : open))"
        >
          <template #trigger="{ open: isOpen }">
            <div class="tx-lp-faq-trigger" role="button">
              <span class="tx-lp-faq-q">{{ item.q }}</span>
              <span class="mdi tx-lp-faq-chevron" :class="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
            </div>
          </template>
          <div class="tx-lp-faq-body">{{ item.a }}</div>
        </b-collapse>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const FAQ = [
  {
    q: 'O que está incluído no template?',
    a: 'Você recebe o código-fonte completo em Vue 3 + Buefy + Bulma + TypeScript, com dezenas de páginas e componentes prontos, dark mode, internacionalização, autenticação mockada e configuração de build otimizada.',
  },
  {
    q: 'Preciso saber TypeScript para usar?',
    a: 'Recomendamos conhecimento básico de Vue e TypeScript. O código é bem organizado e tipado, o que facilita a manutenção e reduz erros ao longo do desenvolvimento.',
  },
  {
    q: 'O template é responsivo e tem dark mode?',
    a: 'Sim. Todas as telas são mobile-first e totalmente responsivas, com suporte nativo a tema claro e escuro usando tokens de design consistentes.',
  },
  {
    q: 'Recebo atualizações futuras?',
    a: 'Sim. Todas as licenças incluem atualizações gratuitas com novos componentes, correções e melhorias de performance enquanto o produto estiver ativo.',
  },
  {
    q: 'Posso usar em projetos comerciais?',
    a: 'Com certeza. A licença permite uso em projetos comerciais e produtos para clientes. Consulte os termos completos para limites de revenda.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Oferecemos suporte por email para todos os planos e suporte prioritário para os planos Pro e Enterprise, com tempos de resposta reduzidos.',
  },
]

const open = ref<number>(0)
</script>

<style scoped>
.tx-lp-section {
  scroll-margin-top: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.tx-lp-faq-container {
  max-width: 48rem;
}
.tx-lp-head {
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
.tx-lp-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 3rem;
}
.tx-lp-faq-item {
  background: var(--tx-card-bg);
  border: 1px solid var(--tx-border);
  border-radius: 12px;
  overflow: hidden;
}
.tx-lp-faq-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  cursor: pointer;
}
.tx-lp-faq-q {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--tx-text-heading);
}
.tx-lp-faq-chevron {
  flex-shrink: 0;
  font-size: 1.25rem;
  color: var(--tx-text-muted);
  transition: transform var(--tx-transition);
}
.tx-lp-faq-body {
  padding: 0 1.25rem 1.1rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--tx-text-muted);
}
</style>
