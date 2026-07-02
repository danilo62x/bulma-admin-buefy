<template>
  <div>
    <div style="margin-bottom: 1.25rem;">
      <h1 class="title is-4" style="margin-bottom: 0.25rem;">Cobrança</h1>
      <p class="subtitle is-6 has-text-grey">
        Gerencie seu plano, forma de pagamento e histórico de faturas.
      </p>
    </div>

    <!-- Plan + payment method -->
    <div class="columns">
      <div class="column is-8">
        <CardComponent title="Plano atual" icon="mdi-rocket-launch">
          <div class="tx-plan-top">
            <div>
              <div class="tx-plan-name-row">
                <h3 class="title is-5" style="margin-bottom: 0;">Plano Pro</h3>
                <span class="tag is-primary is-light">Ativo</span>
              </div>
              <p class="tx-plan-price">
                <span class="has-text-grey is-size-7">R$</span>
                <span class="tx-plan-price-amount">129</span>
                <span class="has-text-grey is-size-7">/mês</span>
              </p>
              <p class="tx-plan-renew">
                <span class="mdi mdi-information-outline" style="color: var(--tx-primary);" />
                Renova em <span class="has-text-weight-medium">28/06/2026</span>
              </p>
            </div>
            <div class="tx-plan-actions">
              <b-button type="is-primary" icon-left="trending-up" @click="ui.notifySuccess('Upgrade de plano iniciado!')">
                Fazer upgrade
              </b-button>
              <b-button type="is-light" icon-left="cog" @click="ui.notifySuccess('Abrindo gerenciamento do plano...')">
                Gerenciar
              </b-button>
            </div>
          </div>

          <div class="tx-plan-stats">
            <div>
              <p class="tx-plan-stat-label">Usuários</p>
              <p class="tx-plan-stat-value">12 / 15</p>
            </div>
            <div>
              <p class="tx-plan-stat-label">Armazenamento</p>
              <p class="tx-plan-stat-value">68 / 100 GB</p>
            </div>
            <div>
              <p class="tx-plan-stat-label">Próx. cobrança</p>
              <p class="tx-plan-stat-value">R$ 129,00</p>
            </div>
          </div>
        </CardComponent>
      </div>

      <div class="column is-4">
        <CardComponent title="Forma de pagamento" icon="mdi-credit-card-outline">
          <div class="tx-card-credit">
            <div class="tx-card-credit-circle tx-card-credit-circle-1" />
            <div class="tx-card-credit-circle tx-card-credit-circle-2" />
            <div class="tx-card-credit-top">
              <span class="has-text-weight-medium">Acme Tecnologia</span>
              <span class="mdi mdi-credit-card" />
            </div>
            <div class="tx-card-credit-chip">
              <div class="tx-card-credit-chip-inner" />
            </div>
            <p class="tx-card-credit-number">•••• •••• •••• 4242</p>
            <div class="tx-card-credit-foot">
              <div>
                <p class="tx-card-credit-cap">Titular</p>
                <p class="has-text-weight-medium is-size-7">Marina Costa</p>
              </div>
              <div class="has-text-right">
                <p class="tx-card-credit-cap">Validade</p>
                <p class="has-text-weight-medium is-size-7">09/28</p>
              </div>
            </div>
          </div>

          <b-button
            type="is-light"
            expanded
            icon-left="pencil"
            style="margin-top: 1rem;"
            @click="ui.notifySuccess('Atualização da forma de pagamento iniciada!')"
          >
            Atualizar
          </b-button>
        </CardComponent>
      </div>
    </div>

    <!-- Usage stats -->
    <div class="columns is-multiline">
      <div class="column is-3-desktop is-6-tablet">
        <StatsCard label="Gasto este mês" value="R$ 1.752,90" icon="mdi-cash-multiple" color="#485fc7" trend="6,2%" :trend-up="true" />
      </div>
      <div class="column is-3-desktop is-6-tablet">
        <StatsCard label="Faturas pagas" value="18" icon="mdi-check-circle" color="#48c774" trend="2" :trend-up="true" />
      </div>
      <div class="column is-3-desktop is-6-tablet">
        <StatsCard label="Pendente" value="R$ 1.752,90" icon="mdi-tag-outline" color="#f59e0b" />
      </div>
      <div class="column is-3-desktop is-6-tablet">
        <StatsCard label="Créditos" value="R$ 90,00" icon="mdi-trending-up" color="#3273dc" trend="100%" :trend-up="true" />
      </div>
    </div>

    <!-- Billing history -->
    <CardComponent title="Histórico de cobrança" icon="mdi-table">
      <div class="table-container">
        <table class="table is-fullwidth is-hoverable tx-history-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
              <th class="has-text-right">Fatura</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in HISTORY" :key="row.id">
              <td class="has-text-grey">{{ row.date }}</td>
              <td class="has-text-weight-medium">{{ row.desc }}</td>
              <td>R$ {{ row.amount }}</td>
              <td>
                <span class="tag" :class="statusClass(row.status)">{{ row.status }}</span>
              </td>
              <td class="has-text-right">
                <b-button
                  size="is-small"
                  type="is-primary"
                  inverted
                  icon-left="download"
                  @click="ui.notifySuccess(`Baixando fatura #${row.id}...`)"
                >
                  #{{ row.id }}
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import StatsCard from '@/components/ui/StatsCard.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Cobrança'))

const HISTORY = [
  { id: '2026-0042', date: '28/05/2026', desc: 'Plano Pro — assinatura anual', amount: '1.752,90', status: 'Pendente' },
  { id: '2026-0031', date: '28/04/2026', desc: 'Usuários adicionais (5 assentos)', amount: '145,00', status: 'Pago' },
  { id: '2026-0024', date: '28/03/2026', desc: 'Plano Pro — mensalidade', amount: '129,00', status: 'Pago' },
  { id: '2026-0018', date: '28/02/2026', desc: 'Armazenamento extra (250 GB)', amount: '98,00', status: 'Pago' },
  { id: '2026-0009', date: '28/01/2026', desc: 'Plano Pro — mensalidade', amount: '129,00', status: 'Pago' },
  { id: '2025-0312', date: '28/12/2025', desc: 'Plano Start — mensalidade', amount: '79,00', status: 'Reembolsado' },
]

function statusClass(status: string) {
  if (status === 'Pago') return 'is-success is-light'
  if (status === 'Pendente') return 'is-warning is-light'
  return 'is-danger is-light'
}
</script>

<style scoped>
.tx-plan-top {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: space-between;
}
.tx-plan-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.tx-plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-top: 0.5rem;
}
.tx-plan-price-amount {
  font-size: 2rem;
  font-weight: 800;
  color: var(--tx-text-heading);
  line-height: 1;
}
.tx-plan-renew {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--tx-text-muted);
}
.tx-plan-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}
.tx-plan-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px solid var(--tx-border);
  padding-top: 1.25rem;
  margin-top: 1.5rem;
}
.tx-plan-stat-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tx-text-muted);
}
.tx-plan-stat-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--tx-text-heading);
  margin-top: 0.25rem;
}

/* Mock credit card */
.tx-card-credit {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--tx-primary), var(--tx-primary-hover));
  padding: 1.25rem;
  color: #fff;
  box-shadow: 0 4px 16px rgba(72, 95, 199, 0.25);
}
.tx-card-credit-circle {
  position: absolute;
  border-radius: 50%;
}
.tx-card-credit-circle-1 {
  right: -2rem;
  top: -2rem;
  width: 7rem;
  height: 7rem;
  background: rgba(255, 255, 255, 0.1);
}
.tx-card-credit-circle-2 {
  bottom: -2.5rem;
  left: -1.5rem;
  width: 7rem;
  height: 7rem;
  background: rgba(255, 255, 255, 0.05);
}
.tx-card-credit-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tx-card-credit-chip {
  position: relative;
  margin-top: 2rem;
  height: 1.75rem;
  width: 2.75rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tx-card-credit-chip-inner {
  height: 1rem;
  width: 1.75rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.4);
}
.tx-card-credit-number {
  position: relative;
  margin-top: 1rem;
  font-family: monospace;
  font-size: 1.1rem;
  letter-spacing: 0.15em;
}
.tx-card-credit-foot {
  position: relative;
  margin-top: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.tx-card-credit-cap {
  font-size: 0.62rem;
  text-transform: uppercase;
  opacity: 0.7;
}
.tx-history-table thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tx-text-muted);
}
</style>
