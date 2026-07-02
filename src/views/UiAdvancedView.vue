<template>
  <div class="ui-advanced">
    <!-- Breadcrumb -->
    <CardComponent title="Breadcrumb — Trilha de navegação" icon="mdi-chevron-right">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <a href="#"><span class="icon is-small"><i class="mdi mdi-view-dashboard" /></span><span>Início</span></a>
          </li>
          <li><a href="#">Componentes</a></li>
          <li class="is-active"><a href="#" aria-current="page">Avançados</a></li>
        </ul>
      </nav>

      <p class="tx-component-label" style="margin-top: 1rem;">Separador: seta</p>
      <nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Usuários</a></li>
          <li class="is-active"><a href="#" aria-current="page">Editar</a></li>
        </ul>
      </nav>
    </CardComponent>

    <!-- Tabs -->
    <CardComponent title="Abas (b-tabs)" icon="mdi-tab" style="margin-top: 1rem;">
      <b-tabs v-model="activeTab" type="is-boxed">
        <b-tab-item label="Visão geral" icon="view-dashboard">
          <p style="font-size: 0.9rem; color: var(--tx-text-muted);">
            Resumo geral do projeto, métricas e indicadores principais em um só lugar.
          </p>
        </b-tab-item>
        <b-tab-item label="Atividade" icon="bell">
          <p style="font-size: 0.9rem; color: var(--tx-text-muted);">
            Histórico de eventos recentes, notificações e ações realizadas pela equipe.
          </p>
        </b-tab-item>
        <b-tab-item label="Configurações" icon="cog">
          <p style="font-size: 0.9rem; color: var(--tx-text-muted);">
            Ajuste preferências, integrações e permissões da sua conta.
          </p>
        </b-tab-item>
      </b-tabs>

      <p class="tx-component-label" style="margin-top: 1rem;">Aba alinhada e tamanho centralizado</p>
      <b-tabs v-model="activeTab2" type="is-toggle" expanded>
        <b-tab-item label="Mensal" />
        <b-tab-item label="Trimestral" />
        <b-tab-item label="Anual" />
      </b-tabs>
    </CardComponent>

    <!-- Accordion (b-collapse) -->
    <div class="columns" style="margin-top: 1rem;">
      <div class="column is-6">
        <CardComponent title="Acordeão — apenas um aberto" icon="mdi-chevron-down">
          <div class="tx-accordion">
            <b-collapse
              v-for="(panel, i) in accordionPanels"
              :key="i"
              :open="openPanel === i"
              animation="slide"
              class="tx-accordion-item"
              @open="openPanel = i"
            >
              <template #trigger="props">
                <div class="tx-accordion-trigger" role="button">
                  <span class="mdi" :class="panel.icon" />
                  <span class="tx-accordion-label">{{ panel.title }}</span>
                  <span class="mdi tx-accordion-chevron" :class="props.open ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                </div>
              </template>
              <div class="tx-accordion-body">{{ panel.content }}</div>
            </b-collapse>
          </div>
        </CardComponent>
      </div>
      <div class="column is-6">
        <CardComponent title="Acordeão — múltiplos abertos" icon="mdi-chevron-down">
          <div class="tx-accordion">
            <b-collapse
              v-for="(panel, i) in faqPanels"
              :key="i"
              :open="multiOpen[i]"
              animation="slide"
              class="tx-accordion-item"
              @open="multiOpen[i] = true"
              @close="multiOpen[i] = false"
            >
              <template #trigger="props">
                <div class="tx-accordion-trigger" role="button">
                  <span class="tx-accordion-label">{{ panel.title }}</span>
                  <span class="mdi tx-accordion-chevron" :class="props.open ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                </div>
              </template>
              <div class="tx-accordion-body">{{ panel.content }}</div>
            </b-collapse>
          </div>
        </CardComponent>
      </div>
    </div>

    <!-- Tooltips -->
    <CardComponent title="Tooltips (b-tooltip)" icon="mdi-tooltip" style="margin-top: 1rem;">
      <div class="tx-btn-group">
        <b-tooltip label="Dica no topo" position="is-top" type="is-dark">
          <b-button type="is-light">Topo</b-button>
        </b-tooltip>
        <b-tooltip label="Dica embaixo" position="is-bottom" type="is-primary">
          <b-button type="is-light">Abaixo</b-button>
        </b-tooltip>
        <b-tooltip label="Dica à esquerda" position="is-left" type="is-success">
          <b-button type="is-light">Esquerda</b-button>
        </b-tooltip>
        <b-tooltip label="Dica à direita" position="is-right" type="is-warning">
          <b-button type="is-light">Direita</b-button>
        </b-tooltip>
        <b-tooltip label="Mais informações sobre este recurso" position="is-top" multilined>
          <span class="icon has-text-grey"><i class="mdi mdi-help-circle-outline" style="font-size: 1.4rem;" /></span>
        </b-tooltip>
      </div>
    </CardComponent>

    <!-- Steps -->
    <CardComponent title="Etapas (b-steps)" icon="mdi-format-list-numbered" style="margin-top: 1rem;">
      <b-steps v-model="activeStep" :has-navigation="false" type="is-primary">
        <b-step-item step="1" label="Carrinho" icon="cart">
          <p class="tx-step-content">Itens selecionados — revise o seu carrinho de compras.</p>
        </b-step-item>
        <b-step-item step="2" label="Endereço" icon="map-marker">
          <p class="tx-step-content">Informe o endereço de entrega do pedido.</p>
        </b-step-item>
        <b-step-item step="3" label="Pagamento" icon="credit-card">
          <p class="tx-step-content">Escolha a forma de pagamento: cartão ou Pix.</p>
        </b-step-item>
        <b-step-item step="4" label="Confirmação" icon="check">
          <p class="tx-step-content">Pedido realizado com sucesso!</p>
        </b-step-item>
      </b-steps>
      <div class="tx-btn-group" style="justify-content: center; margin-top: 1rem;">
        <b-button :disabled="activeStep === 0" icon-left="chevron-left" @click="activeStep--">Anterior</b-button>
        <b-button type="is-primary" :disabled="activeStep === 3" icon-right="chevron-right" @click="activeStep++">
          Próximo
        </b-button>
      </div>
    </CardComponent>

    <div class="columns" style="margin-top: 1rem;">
      <!-- Rate -->
      <div class="column is-6">
        <CardComponent title="Avaliação (b-rate)" icon="mdi-star">
          <div class="tx-rate-row">
            <b-rate v-model="rating" :max="5" />
            <span style="font-size: 0.875rem; color: var(--tx-text-muted);">{{ rating }} de 5</span>
          </div>
          <div class="tx-rate-row" style="border-top: 1px solid var(--tx-border); padding-top: 1rem; margin-top: 1rem;">
            <span style="font-size: 0.875rem;">Somente leitura:</span>
            <b-rate :model-value="4" disabled />
          </div>
          <div class="tx-rate-row" style="margin-top: 1rem;">
            <span style="font-size: 0.875rem;">Com ícones e meio:</span>
            <b-rate v-model="ratingHalf" :max="5" icon="heart" custom-text="curtidas" />
          </div>
        </CardComponent>
      </div>

      <!-- TagInput -->
      <div class="column is-6">
        <CardComponent title="Entrada de tags (b-taginput)" icon="mdi-tag-multiple">
          <b-taginput
            v-model="tags"
            :data="filteredTagSuggestions"
            autocomplete
            allow-new
            icon="label"
            placeholder="Adicionar tecnologia..."
            @typing="onTagTyping"
          />
          <p style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--tx-text-muted);">
            {{ tags.length }} tag(s) — pressione Enter para adicionar, Backspace para remover.
          </p>
        </CardComponent>
      </div>
    </div>

    <!-- Badges -->
    <CardComponent title="Badges (.tag)" icon="mdi-label" style="margin-top: 1rem;">
      <p class="tx-component-label">Soft / light</p>
      <div class="tx-tags-showcase">
        <span class="tag is-primary is-light">Primário</span>
        <span class="tag is-success is-light">Sucesso</span>
        <span class="tag is-warning is-light">Aviso</span>
        <span class="tag is-danger is-light">Erro</span>
        <span class="tag is-light">Neutro</span>
      </div>
      <p class="tx-component-label" style="margin-top: 1rem;">Solid</p>
      <div class="tx-tags-showcase">
        <span class="tag is-primary">Primário</span>
        <span class="tag is-success">Sucesso</span>
        <span class="tag is-warning">Aviso</span>
        <span class="tag is-danger">Erro</span>
        <span class="tag is-dark">Neutro</span>
      </div>
      <p class="tx-component-label" style="margin-top: 1rem;">Com ponto de status e ícone</p>
      <div class="tx-tags-showcase">
        <span class="tag is-success is-light"><span class="tx-badge-dot" style="background: var(--tx-success);" />Online</span>
        <span class="tag is-warning is-light"><span class="tx-badge-dot" style="background: var(--tx-warning);" />Pendente</span>
        <span class="tag is-light"><span class="tx-badge-dot" style="background: var(--tx-text-muted);" />Offline</span>
        <span class="tag is-primary"><span class="icon is-small"><i class="mdi mdi-star" /></span><span>Premium</span></span>
        <span class="tag is-success"><span class="icon is-small"><i class="mdi mdi-check" /></span><span>Verificado</span></span>
      </div>
    </CardComponent>

    <!-- Avatars -->
    <CardComponent title="Avatares" icon="mdi-account-circle" style="margin-top: 1rem;">
      <p class="tx-component-label">Tamanhos (iniciais)</p>
      <div class="tx-avatar-row">
        <span class="tx-avatar tx-avatar-xs" :style="avatarStyle('Ana Silva')">{{ initials('Ana Silva') }}</span>
        <span class="tx-avatar tx-avatar-sm" :style="avatarStyle('Bruno Costa')">{{ initials('Bruno Costa') }}</span>
        <span class="tx-avatar tx-avatar-md" :style="avatarStyle('Carla Dias')">{{ initials('Carla Dias') }}</span>
        <span class="tx-avatar tx-avatar-lg" :style="avatarStyle('Diego Luz')">{{ initials('Diego Luz') }}</span>
        <span class="tx-avatar tx-avatar-xl" :style="avatarStyle('Erica Melo')">{{ initials('Erica Melo') }}</span>
      </div>

      <p class="tx-component-label" style="margin-top: 1.25rem;">Imagem + status</p>
      <div class="tx-avatar-row">
        <span class="tx-avatar tx-avatar-md tx-avatar-img">
          <figure class="image is-48x48 is-rounded">
            <img src="https://placehold.co/96x96/485fc7/ffffff?text=MR" alt="Marina Reis" class="is-rounded" />
          </figure>
          <span class="tx-avatar-status" style="background: var(--tx-success);" />
        </span>
        <span class="tx-avatar tx-avatar-md" :style="avatarStyle('João Pedro')">
          {{ initials('João Pedro') }}
          <span class="tx-avatar-status" style="background: var(--tx-warning);" />
        </span>
        <span class="tx-avatar tx-avatar-md" :style="avatarStyle('Lia Souza')">
          {{ initials('Lia Souza') }}
          <span class="tx-avatar-status" style="background: var(--tx-text-muted);" />
        </span>
      </div>

      <p class="tx-component-label" style="margin-top: 1.25rem;">Grupo empilhado</p>
      <div class="tx-avatar-group">
        <span v-for="n in ['Marina Costa', 'Lucas Pinto', 'André Sá', 'Rafa Lima']" :key="n"
          class="tx-avatar tx-avatar-md tx-avatar-stacked" :style="avatarStyle(n)">{{ initials(n) }}</span>
        <span class="tx-avatar tx-avatar-md tx-avatar-stacked tx-avatar-extra">+5</span>
      </div>
    </CardComponent>

    <!-- Skeleton -->
    <CardComponent title="Skeleton (b-skeleton)" icon="mdi-rectangle-outline" style="margin-top: 1rem;">
      <template #toolbar>
        <b-button size="is-small" icon-left="refresh" @click="loadingSkeleton = !loadingSkeleton">
          {{ loadingSkeleton ? 'Mostrar conteúdo' : 'Mostrar loading' }}
        </b-button>
      </template>

      <div v-if="loadingSkeleton" class="tx-skeleton-block">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <b-skeleton circle width="48px" height="48px" :animated="true" />
          <div style="flex: 1;">
            <b-skeleton width="40%" :animated="true" />
            <b-skeleton width="25%" :animated="true" />
          </div>
        </div>
        <b-skeleton height="120px" :animated="true" />
        <b-skeleton :animated="true" />
        <b-skeleton width="90%" :animated="true" />
        <b-skeleton width="75%" :animated="true" />
      </div>

      <div v-else class="tx-skeleton-block">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="tx-avatar tx-avatar-lg" :style="avatarStyle('Time Produto')">{{ initials('Time Produto') }}</span>
          <div>
            <p style="font-weight: 600; color: var(--tx-text-heading);">Equipe de Produto</p>
            <p style="font-size: 0.8rem; color: var(--tx-text-muted);">12 membros ativos</p>
          </div>
        </div>
        <div class="tx-skeleton-loaded">Conteúdo carregado</div>
        <p style="font-size: 0.9rem; color: var(--tx-text-muted);">
          O conteúdo real substitui os placeholders assim que os dados terminam de carregar, evitando saltos de layout.
        </p>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'

onMounted(() => useUiStore().setPageTitle('Componentes avançados'))

// Tabs
const activeTab = ref(0)
const activeTab2 = ref(0)

// Accordion (single open)
const openPanel = ref(0)
const accordionPanels = [
  { title: 'O que está incluído?', icon: 'mdi-package-variant', content: 'Todos os componentes de UI, temas claro e escuro, e exemplos prontos para produção.' },
  { title: 'Posso personalizar as cores?', icon: 'mdi-palette', content: 'Sim, todas as cores usam tokens de design (CSS custom properties) configuráveis em tempo de execução.' },
  { title: 'Há suporte a TypeScript?', icon: 'mdi-language-typescript', content: 'Completo — todos os componentes possuem props tipadas com script setup lang="ts".' },
]

// Accordion (multiple open)
const faqPanels = [
  { title: 'Entrega', content: 'Enviamos para todo o Brasil em até 5 dias úteis.' },
  { title: 'Trocas e devoluções', content: 'Você tem até 30 dias para solicitar a troca.' },
  { title: 'Garantia', content: 'Todos os produtos têm garantia de 12 meses.' },
]
const multiOpen = reactive<boolean[]>([true, true, false])

// Steps
const activeStep = ref(1)

// Rate
const rating = ref(3)
const ratingHalf = ref(4)

// TagInput
const tags = ref<string[]>(['Vue', 'Bulma', 'TypeScript'])
const tagSuggestions = ['Vue', 'Bulma', 'Buefy', 'TypeScript', 'JavaScript', 'Pinia', 'Vite', 'SCSS', 'ApexCharts']
const tagTyping = ref('')
const filteredTagSuggestions = computed(() =>
  tagSuggestions.filter(
    (t) => !tags.value.includes(t) && t.toLowerCase().includes(tagTyping.value.toLowerCase())
  )
)
function onTagTyping(text: string) {
  tagTyping.value = text
}

// Skeleton
const loadingSkeleton = ref(true)

// Avatar helpers
function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
const avatarColors = ['#485fc7', '#48c774', '#3273dc', '#f59e0b', '#9b59b6', '#e74c3c', '#1abc9c']
function avatarStyle(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  const color = avatarColors[Math.abs(h) % avatarColors.length]
  return { background: `color-mix(in srgb, ${color} 16%, transparent)`, color }
}
</script>

<style scoped>
.tx-component-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tx-text-muted);
  margin-bottom: 0.5rem;
}

.tx-btn-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.tx-tags-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tx-badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.4rem;
  flex-shrink: 0;
}

/* Accordion */
.tx-accordion {
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  overflow: hidden;
}
.tx-accordion-item {
  border-bottom: 1px solid var(--tx-border);
}
.tx-accordion-item:last-child {
  border-bottom: none;
}
.tx-accordion-trigger {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  cursor: pointer;
  background: var(--tx-card-bg);
  transition: background-color var(--tx-transition);
}
.tx-accordion-trigger:hover {
  background: var(--tx-body-bg);
}
.tx-accordion-trigger .mdi:first-child {
  color: var(--tx-primary);
  font-size: 1.1rem;
}
.tx-accordion-label {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--tx-text);
}
.tx-accordion-chevron {
  font-size: 1rem;
  color: var(--tx-text-muted);
}
.tx-accordion-body {
  padding: 0.85rem 1rem 1rem;
  font-size: 0.875rem;
  color: var(--tx-text-muted);
  line-height: 1.6;
  background: var(--tx-body-bg);
  border-top: 1px solid var(--tx-border-subtle);
}

/* Steps */
.tx-step-content {
  font-size: 0.9rem;
  color: var(--tx-text-muted);
  padding: 1rem 0;
  text-align: center;
}

/* Rate */
.tx-rate-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Avatars */
.tx-avatar-row {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.tx-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
}
.tx-avatar-xs { width: 28px; height: 28px; font-size: 0.65rem; }
.tx-avatar-sm { width: 36px; height: 36px; font-size: 0.75rem; }
.tx-avatar-md { width: 48px; height: 48px; font-size: 0.95rem; }
.tx-avatar-lg { width: 60px; height: 60px; font-size: 1.15rem; }
.tx-avatar-xl { width: 76px; height: 76px; font-size: 1.45rem; }
.tx-avatar-img { background: transparent; }
.tx-avatar-img figure { margin: 0; }
.tx-avatar-status {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--tx-card-bg);
}
.tx-avatar-group {
  display: flex;
  align-items: center;
}
.tx-avatar-stacked {
  border: 2px solid var(--tx-card-bg);
  margin-left: -0.75rem;
}
.tx-avatar-stacked:first-child {
  margin-left: 0;
}
.tx-avatar-extra {
  background: var(--tx-body-bg);
  color: var(--tx-text-muted);
}

/* Skeleton */
.tx-skeleton-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.tx-skeleton-loaded {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  border-radius: var(--tx-radius);
  background: color-mix(in srgb, var(--tx-primary) 12%, transparent);
  color: var(--tx-primary);
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
