<template>
  <div>
    <!-- Header -->
    <div class="tx-pricing-header">
      <h2 class="tx-pricing-title">Planos & Preços</h2>
      <p class="tx-pricing-subtitle">
        Escolha o plano ideal para sua empresa. Sem taxas ocultas. Cancele quando quiser.
      </p>
      <div class="tx-billing-toggle">
        <span :class="!annual ? 'tx-toggle-active' : ''">Mensal</span>
        <b-switch v-model="annual" type="is-primary" />
        <span :class="annual ? 'tx-toggle-active' : ''">Anual</span>
        <span class="tag is-success is-light tx-save-badge" v-if="annual">Economize 20%</span>
      </div>
    </div>

    <!-- Plans -->
    <div class="columns is-centered" style="margin-top:1.5rem;">
      <div v-for="plan in plans" :key="plan.key" class="column is-4-desktop is-6-tablet">
        <div class="tx-plan-card" :class="{ 'tx-plan-featured': plan.featured }">
          <div v-if="plan.featured" class="tx-plan-badge">Mais Popular</div>
          <div class="tx-plan-header">
            <div class="tx-plan-icon" :style="{ background: `color-mix(in srgb, ${plan.color} 15%, transparent)`, color: plan.color }">
              <span class="mdi" :class="plan.icon" />
            </div>
            <div class="tx-plan-name">{{ plan.name }}</div>
            <div class="tx-plan-desc">{{ plan.desc }}</div>
          </div>
          <div class="tx-plan-price">
            <span class="tx-price-currency">R$</span>
            <span class="tx-price-amount">{{ annual ? plan.priceAnnual : plan.priceMonthly }}</span>
            <span class="tx-price-period">/mês</span>
          </div>
          <div v-if="annual" class="tx-price-note">
            Cobrado anualmente (R$ {{ plan.priceAnnual * 12 }}/ano)
          </div>
          <b-button
            :type="plan.featured ? 'is-primary' : 'is-light'"
            expanded
            class="tx-plan-cta"
            @click="ui.notifySuccess(`Plano ${plan.name} selecionado!`)"
          >
            {{ plan.cta }}
          </b-button>
          <ul class="tx-plan-features">
            <li v-for="feat in plan.features" :key="feat.text" class="tx-feat-item">
              <span class="mdi tx-feat-icon"
                :class="feat.included ? 'mdi-check-circle' : 'mdi-close-circle'"
                :style="{ color: feat.included ? '#48c774' : 'var(--tx-border)' }"
              />
              <span :class="feat.included ? '' : 'tx-feat-disabled'">{{ feat.text }}</span>
              <b-tooltip v-if="feat.tip" :label="feat.tip" type="is-dark" position="is-top">
                <span class="mdi mdi-information-outline tx-feat-tip" />
              </b-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Feature comparison table -->
    <CardComponent title="Comparação Completa de Recursos" icon="mdi-view-list" style="margin-top:1rem;">
      <template #toolbar>
        <b-button size="is-small" type="is-ghost" icon-left="help-circle"
          @click="ui.notify('Dúvidas? Fale com nosso time comercial.', 'is-info')">
          Preciso de ajuda
        </b-button>
      </template>
      <div class="tx-compare-wrap">
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Recurso</th>
              <th v-for="plan in plans" :key="plan.key" class="has-text-centered">
                <span :style="{ color: plan.color }">{{ plan.name }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="section in compareTable" :key="section.section">
              <tr class="tx-compare-section">
                <td colspan="4"><strong>{{ section.section }}</strong></td>
              </tr>
              <tr v-for="row in section.rows" :key="row.feature">
                <td>
                  {{ row.feature }}
                  <b-tooltip v-if="row.tip" :label="row.tip" type="is-dark">
                    <span class="mdi mdi-information-outline" style="color:var(--tx-text-muted);font-size:0.85rem;margin-left:4px;" />
                  </b-tooltip>
                </td>
                <td v-for="plan in plans" :key="plan.key" class="has-text-centered">
                  <template v-if="typeof row[plan.key as keyof CompareRow] === 'boolean'">
                    <span class="mdi"
                      :class="row[plan.key as keyof CompareRow] ? 'mdi-check-circle has-text-success' : 'mdi-minus has-text-grey-light'"
                    />
                  </template>
                  <template v-else>
                    <span style="font-size:0.85rem;">{{ row[plan.key as keyof CompareRow] }}</span>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </CardComponent>

    <!-- FAQ -->
    <CardComponent title="Perguntas Frequentes" icon="mdi-frequently-asked-questions" style="margin-top:1rem;">
      <div class="tx-collapse-list">
        <b-collapse
          v-for="(faq, i) in faqs" :key="i"
          :model-value="openFaq === i"
          @update:model-value="(v: boolean) => { openFaq = v ? i : (openFaq === i ? null : openFaq) }"
          class="tx-collapse-item"
        >
          <template #trigger="{ open }">
            <div class="tx-collapse-trigger">
              <span class="tx-collapse-label">{{ faq.q }}</span>
              <span class="mdi tx-collapse-chevron" :class="open ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
            </div>
          </template>
          <div class="tx-collapse-body">{{ faq.a }}</div>
        </b-collapse>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Planos & Preços'))

const annual = ref(false)
const openFaq = ref<number | null>(0)

const plans = [
  {
    key: 'basic',
    name: 'Básico',
    desc: 'Ideal para pequenas equipes iniciando sua jornada.',
    priceMonthly: 99,
    priceAnnual: 79,
    cta: 'Começar grátis',
    featured: false,
    color: '#48c774',
    icon: 'mdi-leaf',
    features: [
      { text: 'Até 3 usuários', included: true },
      { text: '5 GB de armazenamento', included: true },
      { text: 'Relatórios básicos', included: true },
      { text: 'Suporte por e-mail', included: true },
      { text: 'API de integração', included: false },
      { text: 'White-label', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'SLA garantido', included: false },
    ],
  },
  {
    key: 'pro',
    name: 'Profissional',
    desc: 'Para equipes em crescimento que precisam de mais poder.',
    priceMonthly: 249,
    priceAnnual: 199,
    cta: 'Assinar agora',
    featured: true,
    color: '#485fc7',
    icon: 'mdi-rocket-launch',
    features: [
      { text: 'Até 15 usuários', included: true },
      { text: '50 GB de armazenamento', included: true },
      { text: 'Relatórios avançados + gráficos', included: true, tip: 'Inclui exportação para PDF e Excel' },
      { text: 'Suporte por chat 8h-18h', included: true },
      { text: 'API de integração completa', included: true },
      { text: 'White-label (parcial)', included: true },
      { text: 'Suporte prioritário', included: false },
      { text: 'SLA garantido', included: false },
    ],
  },
  {
    key: 'enterprise',
    name: 'Empresarial',
    desc: 'Solução completa para grandes organizações.',
    priceMonthly: 699,
    priceAnnual: 559,
    cta: 'Falar com vendas',
    featured: false,
    color: '#f59e0b',
    icon: 'mdi-office-building',
    features: [
      { text: 'Usuários ilimitados', included: true },
      { text: 'Armazenamento ilimitado', included: true },
      { text: 'Analytics em tempo real', included: true, tip: 'Dashboard dedicado com alertas automáticos' },
      { text: 'Suporte 24/7 dedicado', included: true },
      { text: 'API + Webhooks avançados', included: true },
      { text: 'White-label completo', included: true },
      { text: 'Gerente de conta exclusivo', included: true },
      { text: 'SLA 99.9% garantido', included: true },
    ],
  },
]

interface CompareRow {
  feature: string
  tip?: string
  basic: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

const compareTable: { section: string; rows: CompareRow[] }[] = [
  {
    section: 'Usuários & Capacidade',
    rows: [
      { feature: 'Usuários', basic: '3', pro: '15', enterprise: 'Ilimitados' },
      { feature: 'Armazenamento', basic: '5 GB', pro: '50 GB', enterprise: 'Ilimitado' },
      { feature: 'Projetos ativos', basic: '5', pro: '30', enterprise: 'Ilimitados' },
    ],
  },
  {
    section: 'Relatórios & Analytics',
    rows: [
      { feature: 'Relatórios básicos', basic: true, pro: true, enterprise: true },
      { feature: 'Dashboards customizáveis', basic: false, pro: true, enterprise: true },
      { feature: 'Analytics em tempo real', tip: 'Dados atualizados a cada 30 segundos', basic: false, pro: false, enterprise: true },
      { feature: 'Exportação PDF/Excel', basic: false, pro: true, enterprise: true },
    ],
  },
  {
    section: 'Integrações',
    rows: [
      { feature: 'API REST', basic: false, pro: true, enterprise: true },
      { feature: 'Webhooks', basic: false, pro: true, enterprise: true },
      { feature: 'SSO / SAML', basic: false, pro: false, enterprise: true },
      { feature: 'Integrações nativas (Slack, Jira...)', basic: false, pro: '3 apps', enterprise: 'Ilimitadas' },
    ],
  },
  {
    section: 'Suporte',
    rows: [
      { feature: 'Suporte por e-mail', basic: true, pro: true, enterprise: true },
      { feature: 'Chat em tempo real', basic: false, pro: true, enterprise: true },
      { feature: 'Suporte 24/7', basic: false, pro: false, enterprise: true },
      { feature: 'Gerente de conta', basic: false, pro: false, enterprise: true },
      { feature: 'SLA garantido', basic: false, pro: false, enterprise: true },
    ],
  },
]

const faqs = [
  { q: 'Posso trocar de plano a qualquer momento?', a: 'Sim! Você pode fazer upgrade ou downgrade a qualquer momento. No upgrade, o valor é calculado pro-rata. No downgrade, o crédito é aplicado no próximo ciclo.' },
  { q: 'Como funciona o período de teste?', a: 'Todos os planos possuem 14 dias de teste gratuito, sem necessidade de cartão de crédito. Você só paga quando decidir continuar.' },
  { q: 'Vocês oferecem desconto para startups ou ONGs?', a: 'Sim, oferecemos 40% de desconto para startups com menos de 2 anos e 60% para ONGs devidamente registradas. Entre em contato com nosso time comercial.' },
  { q: 'Os dados ficam seguros?', a: 'Seus dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256). Fazemos backups diários automáticos e oferecemos conformidade com LGPD e GDPR.' },
  { q: 'Posso cancelar sem multa?', a: 'Nos planos mensais, você pode cancelar a qualquer momento sem cobrança futura. Nos planos anuais, o cancelamento encerra o acesso no fim do período pago.' },
]
</script>

<style scoped>
.tx-pricing-header {
  text-align: center;
  padding: 1.5rem 1rem 0.5rem;
}
.tx-pricing-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--tx-text-heading);
}
.tx-pricing-subtitle {
  font-size: 0.95rem;
  color: var(--tx-text-muted);
  margin-top: 0.5rem;
  margin-bottom: 1.25rem;
}
.tx-billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--tx-text-muted);
}
.tx-toggle-active {
  color: var(--tx-text);
  font-weight: 600;
}
.tx-save-badge { font-size: 0.72rem !important; }
.tx-plan-card {
  background: var(--tx-card-bg);
  border: 2px solid var(--tx-border);
  border-radius: calc(var(--tx-radius) * 1.5);
  padding: 1.75rem 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
}
.tx-plan-featured {
  border-color: #485fc7;
  box-shadow: 0 4px 20px rgba(72,95,199,0.18);
}
.tx-plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #485fc7;
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.9rem;
  border-radius: 99px;
  white-space: nowrap;
}
.tx-plan-header { display: flex; flex-direction: column; gap: 0.4rem; }
.tx-plan-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}
.tx-plan-name { font-size: 1.15rem; font-weight: 700; color: var(--tx-text-heading); }
.tx-plan-desc { font-size: 0.82rem; color: var(--tx-text-muted); }
.tx-plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}
.tx-price-currency { font-size: 1rem; font-weight: 600; color: var(--tx-text-muted); }
.tx-price-amount { font-size: 2.4rem; font-weight: 800; color: var(--tx-text-heading); line-height: 1; }
.tx-price-period { font-size: 0.85rem; color: var(--tx-text-muted); }
.tx-price-note { font-size: 0.75rem; color: var(--tx-text-muted); margin-top: -0.75rem; }
.tx-plan-cta { margin-top: 0.25rem; }
.tx-plan-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; flex: 1; }
.tx-feat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--tx-text);
}
.tx-feat-icon { font-size: 1rem; flex-shrink: 0; }
.tx-feat-disabled { color: var(--tx-text-muted); text-decoration: line-through; }
.tx-feat-tip { font-size: 0.8rem; color: var(--tx-text-muted); cursor: help; }
.tx-compare-wrap { overflow-x: auto; }
.tx-compare-section td {
  background: var(--tx-body-bg) !important;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--tx-text-muted);
  padding-top: 1rem !important;
}
/* Reuse existing collapse styles from global app.scss */
.tx-collapse-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  overflow: hidden;
}
.tx-collapse-item {
  border-bottom: 1px solid var(--tx-border);
  &:last-child { border-bottom: none; }
}
.tx-collapse-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  cursor: pointer;
  background: var(--tx-card-bg);
  transition: background-color var(--tx-transition);
  &:hover { background: var(--tx-body-bg); }
}
.tx-collapse-label { font-size: 0.9rem; font-weight: 500; color: var(--tx-text); flex: 1; }
.tx-collapse-chevron { font-size: 1rem; color: var(--tx-text-muted); }
.tx-collapse-body {
  padding: 0.85rem 1rem 1rem;
  font-size: 0.875rem;
  color: var(--tx-text-muted);
  line-height: 1.65;
  background: var(--tx-body-bg);
  border-top: 1px solid var(--tx-border-subtle);
}
</style>
