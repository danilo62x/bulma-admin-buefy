<template>
  <div>
    <!-- Stats row -->
    <div class="columns is-multiline" style="margin-bottom: 0.5rem;">
      <div v-for="stat in stats" :key="stat.label" class="column is-3-desktop is-6-tablet is-12-mobile">
        <StatsCard v-bind="stat" />
      </div>
    </div>

    <!-- Content row -->
    <div class="columns">
      <!-- Recent activity -->
      <div class="column is-7">
        <CardComponent title="Atividades Recentes" icon="mdi-history">
          <template #toolbar>
            <b-button size="is-small" type="is-ghost" icon-left="refresh">Atualizar</b-button>
          </template>
          <div>
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="tx-activity-item"
            >
              <div class="tx-activity-icon" :style="{ '--icon-color': activity.color }">
                <span class="mdi" :class="activity.icon" />
              </div>
              <div class="tx-activity-content">
                <div class="tx-activity-title">{{ activity.title }}</div>
                <div class="tx-activity-meta">{{ activity.user }} · {{ activity.time }}</div>
              </div>
              <span class="tx-activity-tag" :style="{ '--tag-color': activity.color }">
                {{ activity.type }}
              </span>
            </div>
          </div>
        </CardComponent>
      </div>

      <!-- Goals -->
      <div class="column is-5">
        <CardComponent title="Metas do Mês" icon="mdi-target">
          <div>
            <div v-for="goal in goals" :key="goal.label" class="tx-goal-item">
              <div class="tx-goal-row">
                <span class="tx-goal-label">{{ goal.label }}</span>
                <span class="tx-goal-value">{{ goal.value }}%</span>
              </div>
              <b-progress
                :value="goal.value"
                :type="goal.type"
                size="is-small"
              />
            </div>
          </div>
        </CardComponent>

        <!-- Quick actions -->
        <CardComponent title="Ações Rápidas" icon="mdi-lightning-bolt" style="margin-top: 1rem;">
          <div class="tx-quick-actions-grid">
            <button
              v-for="action in quickActions"
              :key="action.label"
              class="tx-quick-action"
              :style="{ '--action-color': action.color }"
              @click="ui.notify(action.label + ' clicado!', 'is-info')"
            >
              <span class="mdi tx-quick-action-icon" :class="action.icon" />
              <span class="tx-quick-action-label">{{ action.label }}</span>
            </button>
          </div>
        </CardComponent>
      </div>
    </div>

    <!-- Orders table -->
    <CardComponent title="Últimos Pedidos" icon="mdi-cart">
      <template #toolbar>
        <RouterLink to="/tables">
          <b-button size="is-small" type="is-primary" outlined>Ver todos</b-button>
        </RouterLink>
      </template>
      <b-table
        :data="recentOrders"
        :striped="true"
        :hoverable="true"
        :mobile-cards="false"
      >
        <b-table-column field="id" label="#" width="60" v-slot="{ row }">
          <strong>#{{ row.id }}</strong>
        </b-table-column>
        <b-table-column field="customer" label="Cliente" v-slot="{ row }">
          {{ row.customer }}
        </b-table-column>
        <b-table-column field="product" label="Produto" v-slot="{ row }">
          {{ row.product }}
        </b-table-column>
        <b-table-column field="value" label="Valor" v-slot="{ row }">
          R$ {{ row.value.toFixed(2) }}
        </b-table-column>
        <b-table-column field="status" label="Status" v-slot="{ row }">
          <span class="tag" :class="statusClass(row.status)">{{ row.status }}</span>
        </b-table-column>
        <b-table-column field="date" label="Data" v-slot="{ row }">
          {{ row.date }}
        </b-table-column>
      </b-table>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import StatsCard from '@/components/ui/StatsCard.vue'

const ui = useUiStore()

onMounted(() => ui.setPageTitle('Dashboard'))

const stats = [
  { value: '2.841', label: 'Usuários', icon: 'mdi-account-group', color: '#485fc7', trend: '+12% este mês', trendUp: true },
  { value: '184', label: 'Pedidos', icon: 'mdi-cart', color: '#48c774', trend: '+5% este mês', trendUp: true },
  { value: 'R$ 48.2k', label: 'Receita', icon: 'mdi-currency-brl', color: '#3273dc', trend: '+18% este mês', trendUp: true },
  { value: '23', label: 'Pendentes', icon: 'mdi-clock-alert', color: '#f59e0b', trend: '-3 hoje', trendUp: false },
]

const recentActivities = [
  { id: 1, title: 'Novo pedido realizado', user: 'João Silva', time: '2 min', icon: 'mdi-cart-plus', color: '#48c774', type: 'Pedido' },
  { id: 2, title: 'Usuário cadastrado', user: 'Maria Santos', time: '15 min', icon: 'mdi-account-plus', color: '#3273dc', type: 'Usuário' },
  { id: 3, title: 'Pagamento aprovado', user: 'Sistema', time: '1h', icon: 'mdi-check-circle', color: '#48c774', type: 'Pagamento' },
  { id: 4, title: 'Relatório exportado', user: 'Carlos Lima', time: '2h', icon: 'mdi-file-export', color: '#485fc7', type: 'Relatório' },
  { id: 5, title: 'Estoque atualizado', user: 'Ana Costa', time: '3h', icon: 'mdi-package-variant', color: '#f59e0b', type: 'Estoque' },
]

const goals = [
  { label: 'Vendas mensais', value: 72, type: 'is-success' },
  { label: 'Novos clientes', value: 58, type: 'is-info' },
  { label: 'Satisfação', value: 91, type: 'is-primary' },
  { label: 'Metas de equipe', value: 44, type: 'is-warning' },
]

const quickActions = [
  { label: 'Novo Pedido', icon: 'mdi-plus-circle', color: '#485fc7' },
  { label: 'Relatório', icon: 'mdi-file-chart', color: '#3273dc' },
  { label: 'Usuários', icon: 'mdi-account-group', color: '#48c774' },
  { label: 'Configurar', icon: 'mdi-cog', color: '#f59e0b' },
]

const recentOrders = [
  { id: 1001, customer: 'João Silva', product: 'Plano Pro', value: 299.90, status: 'Aprovado', date: '25/05/2026' },
  { id: 1002, customer: 'Maria Santos', product: 'Plano Basic', value: 99.90, status: 'Pendente', date: '25/05/2026' },
  { id: 1003, customer: 'Carlos Lima', product: 'Plano Enterprise', value: 899.90, status: 'Aprovado', date: '24/05/2026' },
  { id: 1004, customer: 'Ana Costa', product: 'Plano Pro', value: 299.90, status: 'Cancelado', date: '24/05/2026' },
  { id: 1005, customer: 'Pedro Oliveira', product: 'Plano Basic', value: 99.90, status: 'Aprovado', date: '23/05/2026' },
]

function statusClass(status: string) {
  const map: Record<string, string> = {
    Aprovado: 'is-success is-light',
    Pendente: 'is-warning is-light',
    Cancelado: 'is-danger is-light',
  }
  return map[status] ?? 'is-light'
}
</script>
