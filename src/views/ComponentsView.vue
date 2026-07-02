<template>
  <div>
    <!-- Notificações -->
    <CardComponent title="Notificações & Toasts" icon="mdi-bell">
      <div class="tx-btn-group">
        <b-button type="is-success" icon-left="check-circle" @click="ui.notifySuccess('Operação realizada com sucesso!')">
          Sucesso
        </b-button>
        <b-button type="is-danger" icon-left="close-circle" @click="ui.notifyError('Ocorreu um erro. Tente novamente.')">
          Erro
        </b-button>
        <b-button type="is-warning" icon-left="alert" @click="ui.notifyWarning('Atenção: verifique os dados.')">
          Aviso
        </b-button>
        <b-button type="is-info" icon-left="information" @click="ui.notify('Informação importante.', 'is-info')">
          Info
        </b-button>
      </div>
    </CardComponent>

    <!-- Modais -->
    <CardComponent title="Modais" icon="mdi-window-restore" style="margin-top: 1rem;">
      <div class="tx-btn-group">
        <b-button type="is-primary" @click="showModal = true">Abrir Modal</b-button>
        <b-button type="is-warning" @click="showConfirm = true">Confirmar Ação</b-button>
      </div>

      <b-modal v-model:modelValue="showModal" has-modal-card trap-focus>
        <div class="modal-card" style="width: 500px; max-width: 100%;">
          <header class="modal-card-head">
            <p class="modal-card-title">Exemplo de Modal</p>
            <button class="delete" @click="showModal = false" />
          </header>
          <section class="modal-card-body">
            <b-field label="Campo de exemplo">
              <b-input v-model="modalInput" placeholder="Digite algo..." expanded />
            </b-field>
            <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--tx-text-muted);">
              Exemplo de modal usando <code>b-modal</code> com <code>has-modal-card</code> e <code>trap-focus</code>.
            </p>
          </section>
          <footer class="modal-card-foot tx-modal-foot">
            <b-button @click="showModal = false">Cancelar</b-button>
            <b-button type="is-primary" @click="handleModalSave">Salvar</b-button>
          </footer>
        </div>
      </b-modal>

      <b-modal v-model:modelValue="showConfirm" has-modal-card>
        <div class="modal-card" style="width: 400px; max-width: 100%;">
          <header class="modal-card-head">
            <p class="modal-card-title">Confirmar ação</p>
          </header>
          <section class="modal-card-body">
            <p style="font-size: 0.875rem;">Você tem certeza que deseja executar esta ação? Ela não pode ser desfeita.</p>
          </section>
          <footer class="modal-card-foot tx-modal-foot">
            <b-button @click="showConfirm = false">Cancelar</b-button>
            <b-button type="is-danger" icon-left="alert" @click="handleConfirm">Confirmar</b-button>
          </footer>
        </div>
      </b-modal>
    </CardComponent>

    <!-- Cards -->
    <div class="columns" style="margin-top: 1rem;">
      <div class="column is-4">
        <CardComponent title="Card Simples" icon="mdi-card-outline">
          <p style="font-size: 0.875rem; color: var(--tx-text-muted);">
            Card básico com título, ícone e conteúdo. Use slots para personalizar cabeçalho, corpo e rodapé.
          </p>
        </CardComponent>
      </div>
      <div class="column is-4">
        <CardComponent title="Card com Footer" icon="mdi-card-text">
          <p style="font-size: 0.875rem; color: var(--tx-text-muted);">
            Este card tem um slot <code>#footer</code> com botões de ação.
          </p>
          <template #footer>
            <div class="tx-card-footer-actions">
              <b-button size="is-small" type="is-primary">Ação primária</b-button>
              <b-button size="is-small" type="is-light">Cancelar</b-button>
            </div>
          </template>
        </CardComponent>
      </div>
      <div class="column is-4">
        <CardComponent title="Card com Toolbar" icon="mdi-card-bulleted">
          <template #toolbar>
            <b-dropdown aria-role="list" position="is-bottom-left">
              <template #trigger>
                <b-button size="is-small" type="is-ghost" icon-right="dots-vertical" />
              </template>
              <b-dropdown-item aria-role="listitem">Editar</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Duplicar</b-dropdown-item>
              <b-dropdown-item aria-role="listitem" class="has-text-danger">Excluir</b-dropdown-item>
            </b-dropdown>
          </template>
          <p style="font-size: 0.875rem; color: var(--tx-text-muted);">
            Card com slot <code>#toolbar</code> — dropdown de ações no cabeçalho.
          </p>
        </CardComponent>
      </div>
    </div>

    <!-- Tags & Badges -->
    <CardComponent title="Tags & Badges" icon="mdi-tag" style="margin-top: 1rem;">
      <div class="tx-tags-showcase">
        <span class="tag is-primary">Primary</span>
        <span class="tag is-success">Sucesso</span>
        <span class="tag is-warning">Aviso</span>
        <span class="tag is-danger">Erro</span>
        <span class="tag is-info">Info</span>
        <span class="tag is-dark">Dark</span>
        <span class="tag is-light">Light</span>
        <span class="tag is-primary is-light">Primary light</span>
        <span class="tag is-success is-light">Success light</span>
        <span class="tag is-danger is-light">Danger light</span>
        <span class="tag is-rounded is-primary">Rounded</span>
        <span class="tag is-medium is-info">Medium</span>
        <span class="tag is-large is-warning">Large</span>
      </div>
    </CardComponent>

    <!-- Progress bars -->
    <CardComponent title="Barras de Progresso" icon="mdi-chart-bar" style="margin-top: 1rem;">
      <div class="tx-progress-list">
        <div v-for="bar in progressBars" :key="bar.label">
          <div class="tx-progress-row">
            <span>{{ bar.label }}</span>
            <span>{{ bar.value }}%</span>
          </div>
          <b-progress :value="bar.value" :type="bar.type" />
        </div>
        <div>
          <div class="tx-progress-row">
            <span>Indeterminado</span>
            <span class="tag is-light is-small">Carregando</span>
          </div>
          <b-progress type="is-primary" />
        </div>
      </div>
    </CardComponent>

    <!-- Tooltips & Dropdown -->
    <div class="columns" style="margin-top: 1rem;">
      <div class="column is-6">
        <CardComponent title="Tooltips" icon="mdi-tooltip">
          <div class="tx-btn-group">
            <b-tooltip label="Tooltip padrão" type="is-dark">
              <b-button type="is-light">Dark</b-button>
            </b-tooltip>
            <b-tooltip label="Tooltip de sucesso" type="is-success" position="is-top">
              <b-button type="is-success" outlined>Top</b-button>
            </b-tooltip>
            <b-tooltip label="Tooltip de aviso" type="is-warning" position="is-right">
              <b-button type="is-warning" outlined>Right</b-button>
            </b-tooltip>
            <b-tooltip label="Tooltip de erro" type="is-danger" position="is-bottom">
              <b-button type="is-danger" outlined>Bottom</b-button>
            </b-tooltip>
          </div>
        </CardComponent>
      </div>
      <div class="column is-6">
        <CardComponent title="Dropdown" icon="mdi-chevron-down">
          <div class="tx-btn-group">
            <b-dropdown aria-role="list">
              <template #trigger="{ active }">
                <b-button type="is-primary" :icon-right="active ? 'menu-up' : 'menu-down'">
                  Ações
                </b-button>
              </template>
              <b-dropdown-item aria-role="listitem">
                <span class="mdi mdi-pencil" style="margin-right: 0.5rem;" />Editar
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                <span class="mdi mdi-content-copy" style="margin-right: 0.5rem;" />Duplicar
              </b-dropdown-item>
              <hr class="dropdown-divider" />
              <b-dropdown-item aria-role="listitem" class="has-text-danger">
                <span class="mdi mdi-delete" style="margin-right: 0.5rem;" />Excluir
              </b-dropdown-item>
            </b-dropdown>

            <b-dropdown aria-role="list" position="is-bottom-left">
              <template #trigger>
                <b-button type="is-light" icon-right="dots-vertical">Menu</b-button>
              </template>
              <b-dropdown-item aria-role="listitem">Item 1</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Item 2</b-dropdown-item>
              <b-dropdown-item aria-role="listitem" disabled>Desabilitado</b-dropdown-item>
            </b-dropdown>
          </div>
        </CardComponent>
      </div>
    </div>

    <!-- Loading & Skeleton -->
    <div class="columns" style="margin-top: 1rem;">
      <div class="column is-6">
        <CardComponent title="Loading" icon="mdi-loading">
          <div class="tx-btn-group">
            <b-button type="is-primary" :loading="true">Carregando</b-button>
            <b-button type="is-success" outlined :loading="true">Salvando</b-button>
            <b-button type="is-danger" :loading="true">Excluindo</b-button>
          </div>
        </CardComponent>
      </div>
      <div class="column is-6">
        <CardComponent title="Skeleton" icon="mdi-rectangle-outline">
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <b-skeleton width="85%" :animated="true" />
            <b-skeleton width="60%" :animated="true" />
            <b-skeleton width="75%" :animated="true" />
            <b-skeleton size="is-large" :animated="true" circle />
          </div>
        </CardComponent>
      </div>
    </div>

    <!-- Carousel -->
    <CardComponent title="Carousel" icon="mdi-view-carousel" style="margin-top: 1rem;">
      <b-carousel :autoplay="false" :indicator="true" :arrow="true">
        <b-carousel-item v-for="slide in carouselSlides" :key="slide.id">
          <div
            class="tx-carousel-slide"
            :style="{ background: slide.color }"
          >
            <span class="mdi tx-carousel-icon" :class="slide.icon" />
            <h3 class="tx-carousel-title">{{ slide.title }}</h3>
            <p class="tx-carousel-desc">{{ slide.desc }}</p>
          </div>
        </b-carousel-item>
      </b-carousel>
    </CardComponent>

    <!-- Messages -->
    <CardComponent title="Message — Blocos de Mensagem" icon="mdi-message-text" style="margin-top: 1rem;">
      <div class="tx-message-list">
        <b-message type="is-info" title="Informação" has-icon icon="information" :closable="false">
          Esta é uma mensagem informativa. Use para orientações e dicas ao usuário.
        </b-message>
        <b-message type="is-success" title="Sucesso" has-icon icon="check-circle" :closable="false">
          Operação realizada com êxito! Os dados foram salvos corretamente.
        </b-message>
        <b-message type="is-warning" title="Atenção" has-icon icon="alert" :closable="false">
          Verifique os campos antes de continuar. Alguns dados podem estar incompletos.
        </b-message>
        <b-message type="is-danger" title="Erro" has-icon icon="close-circle" :closable="false">
          Falha ao processar a solicitação. Tente novamente ou contate o suporte.
        </b-message>
        <b-message title="Mensagem fechável" :closable="true">
          Esta mensagem pode ser fechada pelo usuário clicando no botão de fechar.
        </b-message>
      </div>
    </CardComponent>

    <!-- Breadcrumb -->
    <div class="columns" style="margin-top: 1rem;">
      <div class="column is-6">
        <CardComponent title="Breadcrumb — Navegação Hierárquica" icon="mdi-dots-horizontal">
          <div class="tx-breadcrumb-list">
            <p class="tx-component-label">Padrão</p>
            <b-breadcrumb>
              <b-breadcrumb-item tag="a">Início</b-breadcrumb-item>
              <b-breadcrumb-item tag="a">Interface</b-breadcrumb-item>
              <b-breadcrumb-item tag="a" active>Componentes</b-breadcrumb-item>
            </b-breadcrumb>
            <p class="tx-component-label" style="margin-top: 1rem;">Separador: Seta</p>
            <b-breadcrumb separator="has-arrow-separator">
              <b-breadcrumb-item tag="a">Dashboard</b-breadcrumb-item>
              <b-breadcrumb-item tag="a">Usuários</b-breadcrumb-item>
              <b-breadcrumb-item tag="a" active>Editar</b-breadcrumb-item>
            </b-breadcrumb>
            <p class="tx-component-label" style="margin-top: 1rem;">Separador: Ponto</p>
            <b-breadcrumb separator="has-dot-separator">
              <b-breadcrumb-item tag="a">Projetos</b-breadcrumb-item>
              <b-breadcrumb-item tag="a">Alpha</b-breadcrumb-item>
              <b-breadcrumb-item tag="a" active>Relatório</b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </CardComponent>
      </div>
      <div class="column is-6">
        <CardComponent title="Image — Imagem Responsiva" icon="mdi-image">
          <p class="tx-component-label">Proporção 16:9 (b-image)</p>
          <b-image
            src="https://placehold.co/640x360/485fc7/ffffff?text=16:9"
            alt="Imagem de exemplo 16:9"
            ratio="16by9"
            rounded
          />
          <div class="columns" style="margin-top: 1rem;">
            <div class="column">
              <p class="tx-component-label">1:1 (quadrado)</p>
              <b-image
                src="https://placehold.co/200x200/48c774/ffffff?text=1:1"
                alt="Quadrado"
                ratio="1by1"
                rounded
              />
            </div>
            <div class="column">
              <p class="tx-component-label">4:3</p>
              <b-image
                src="https://placehold.co/200x150/3273dc/ffffff?text=4:3"
                alt="4:3"
                ratio="4by3"
                rounded
              />
            </div>
            <div class="column">
              <p class="tx-component-label">Lazy loading</p>
              <b-image
                src="https://placehold.co/200x150/f59e0b/ffffff?text=Lazy"
                alt="Lazy"
                ratio="4by3"
                :lazy="true"
                rounded
              />
            </div>
          </div>
        </CardComponent>
      </div>
    </div>

    <!-- Sidebar off-canvas -->
    <CardComponent title="Sidebar Off-Canvas (b-sidebar)" icon="mdi-page-layout-sidebar-left" style="margin-top: 1rem;">
      <div class="tx-btn-group">
        <b-button type="is-primary" icon-left="dock-left" @click="showSidebar = true">
          Abrir Sidebar Esquerda
        </b-button>
        <b-button type="is-info" icon-left="dock-right" @click="showSidebarRight = true">
          Abrir Sidebar Direita
        </b-button>
      </div>
      <p style="margin-top:0.75rem; font-size:0.82rem; color:var(--tx-text-muted);">
        <code>b-sidebar</code> cria um painel off-canvas com overlay. Diferente da sidebar de navegação do layout, este componente é para conteúdo contextual como filtros, detalhes e formulários em painel lateral.
      </p>

      <b-sidebar v-model="showSidebar" type="is-white" :overlay="true" :fullheight="true" :fullwidth="false" :right="false" :can-cancel="['escape', 'outside']">
        <div class="tx-offcanvas-panel">
          <div class="tx-offcanvas-header">
            <h3 class="tx-offcanvas-title">Filtros Avançados</h3>
            <b-button type="is-ghost" size="is-small" icon-left="close" @click="showSidebar = false" />
          </div>
          <div class="tx-offcanvas-body">
            <b-field label="Status">
              <b-select v-model="sidebarFilter.status" expanded>
                <option value="">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </b-select>
            </b-field>
            <b-field label="Período">
              <b-datepicker v-model="sidebarFilter.date" placeholder="Selecione..." locale="pt-BR" trap-focus expanded />
            </b-field>
            <b-field label="Categoria">
              <div class="tx-check-group">
                <b-checkbox v-model="sidebarFilter.cats" native-value="hw">Hardware</b-checkbox>
                <b-checkbox v-model="sidebarFilter.cats" native-value="sw">Software</b-checkbox>
                <b-checkbox v-model="sidebarFilter.cats" native-value="per">Periférico</b-checkbox>
              </div>
            </b-field>
            <b-field label="Faixa de preço">
              <b-slider v-model="sidebarFilter.price" :min="0" :max="5000" :step="100" type="is-primary" :custom-formatter="(v: number) => `R$ ${v}`" />
            </b-field>
          </div>
          <div class="tx-offcanvas-footer">
            <b-button type="is-primary" expanded icon-left="filter" @click="() => { showSidebar = false; ui.notifySuccess('Filtros aplicados!') }">
              Aplicar Filtros
            </b-button>
            <b-button type="is-light" expanded style="margin-top:0.5rem;" @click="() => { Object.assign(sidebarFilter, { status: '', date: null, cats: [], price: 2500 }); showSidebar = false }">
              Limpar
            </b-button>
          </div>
        </div>
      </b-sidebar>

      <b-sidebar v-model="showSidebarRight" type="is-white" :overlay="true" :fullheight="true" :right="true" :can-cancel="['escape', 'outside']">
        <div class="tx-offcanvas-panel">
          <div class="tx-offcanvas-header">
            <h3 class="tx-offcanvas-title">Detalhes do Item</h3>
            <b-button type="is-ghost" size="is-small" icon-left="close" @click="showSidebarRight = false" />
          </div>
          <div class="tx-offcanvas-body">
            <div class="tx-detail-grid" style="margin-bottom:1rem;">
              <div><p class="tx-detail-label">Nome</p><p class="tx-detail-value">Monitor 27" 4K</p></div>
              <div><p class="tx-detail-label">SKU</p><p class="tx-detail-value">MON-27-4K-002</p></div>
              <div><p class="tx-detail-label">Categoria</p><p class="tx-detail-value">Hardware</p></div>
              <div><p class="tx-detail-label">Estoque</p><p class="tx-detail-value">8 un.</p></div>
              <div><p class="tx-detail-label">Preço</p><p class="tx-detail-value">R$ 2.199,90</p></div>
              <div><p class="tx-detail-label">Status</p><p class="tx-detail-value"><span class="tag is-success is-light">Ativo</span></p></div>
            </div>
            <b-message type="is-warning" :closable="false" style="font-size:0.82rem;">
              Estoque baixo — apenas 8 unidades disponíveis.
            </b-message>
          </div>
          <div class="tx-offcanvas-footer">
            <b-button type="is-info" expanded icon-left="pencil" @click="() => { showSidebarRight = false; ui.notify('Editando...', 'is-info') }">
              Editar
            </b-button>
          </div>
        </div>
      </b-sidebar>
    </CardComponent>

    <!-- Collapse -->
    <CardComponent title="Collapse / Acordeão" icon="mdi-chevron-down" style="margin-top: 1rem;">
      <div class="tx-collapse-list">
        <b-collapse
          v-for="(panel, i) in collapsePanels"
          :key="i"
          :model-value="openPanel === i"
          @update:model-value="(val: boolean) => { openPanel = val ? i : (openPanel === i ? null : openPanel) }"
          class="tx-collapse-item"
        >
          <template #trigger="{ open }">
            <div class="tx-collapse-trigger">
              <span class="mdi" :class="panel.icon" style="font-size: 1.1rem; color: var(--tx-primary);" />
              <span class="tx-collapse-label">{{ panel.title }}</span>
              <span class="mdi tx-collapse-chevron" :class="open ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
            </div>
          </template>
          <div class="tx-collapse-body">
            {{ panel.content }}
          </div>
        </b-collapse>
      </div>
    </CardComponent>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Componentes'))

const showModal = ref(false)
const showConfirm = ref(false)
const modalInput = ref('')
const showSidebar = ref(false)
const showSidebarRight = ref(false)
const sidebarFilter = reactive({ status: '', date: null as Date | null, cats: [] as string[], price: 2500 })

const progressBars = [
  { label: 'Primary', value: 65, type: 'is-primary' },
  { label: 'Sucesso', value: 80, type: 'is-success' },
  { label: 'Aviso', value: 45, type: 'is-warning' },
  { label: 'Erro', value: 30, type: 'is-danger' },
  { label: 'Info', value: 55, type: 'is-info' },
]

const carouselSlides = [
  {
    id: 1,
    title: 'Design System',
    desc: 'Componentes consistentes, reutilizáveis e acessíveis.',
    icon: 'mdi-palette',
    color: 'linear-gradient(135deg, #485fc7 0%, #3a4fa3 100%)',
  },
  {
    id: 2,
    title: 'Vue 3 + Buefy',
    desc: 'Composition API com componentes prontos para produção.',
    icon: 'mdi-vuejs',
    color: 'linear-gradient(135deg, #48c774 0%, #2d9e59 100%)',
  },
  {
    id: 3,
    title: 'Dark Mode',
    desc: 'Suporte completo a tema claro e escuro com CSS variables.',
    icon: 'mdi-theme-light-dark',
    color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    id: 4,
    title: 'Responsivo',
    desc: 'Layout adaptável para mobile, tablet e desktop.',
    icon: 'mdi-responsive',
    color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
]

const openPanel = ref<number | null>(0)

const collapsePanels = [
  {
    title: 'O que é o Buefy?',
    icon: 'mdi-information-outline',
    content:
      'Buefy é uma biblioteca de componentes de interface para Vue.js baseada no framework CSS Bulma. Oferece mais de 30 componentes prontos para produção, incluindo formulários, tabelas, modais, notificações e muito mais.',
  },
  {
    title: 'Como funciona o Dark Mode?',
    icon: 'mdi-theme-light-dark',
    content:
      'O dark mode é implementado via CSS custom properties. Ao definir o atributo data-theme="dark" no elemento <html>, os valores das variáveis CSS são substituídos pelos valores do tema escuro. Buefy usa o sistema de variáveis do Bulma 1.x (--bulma-*), que é sobrescrito automaticamente.',
  },
  {
    title: 'Posso personalizar as cores?',
    icon: 'mdi-palette',
    content:
      'Sim! As cores do design system são definidas como CSS custom properties no arquivo variables.css (--tx-primary, --tx-success, etc.). Para alterar a cor primária de todo o sistema, basta modificar --tx-primary e o valor correspondente do Bulma via SCSS ($primary) antes do @use "bulma/bulma".',
  },
  {
    title: 'Estrutura de pastas do projeto',
    icon: 'mdi-folder-outline',
    content:
      'src/assets/styles/ — SCSS e CSS globais. src/components/ — componentes reutilizáveis. src/views/ — páginas da aplicação. src/stores/ — estado global com Pinia. src/router/ — rotas com Vue Router.',
  },
]

function handleModalSave() {
  showModal.value = false
  ui.notifySuccess('Modal salvo com sucesso!')
}

function handleConfirm() {
  showConfirm.value = false
  ui.notifySuccess('Ação confirmada!')
}
</script>

<style scoped>
.tx-carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  border-radius: var(--tx-radius);
  color: white;
  text-align: center;
  padding: 2rem;
}

.tx-carousel-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.tx-carousel-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.tx-carousel-desc {
  font-size: 0.9rem;
  opacity: 0.85;
  max-width: 360px;
}

.tx-collapse-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  overflow: hidden;
}

.tx-collapse-item {
  border-bottom: 1px solid var(--tx-border);

  &:last-child {
    border-bottom: none;
  }
}

.tx-collapse-trigger {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  cursor: pointer;
  background: var(--tx-card-bg);
  transition: background-color var(--tx-transition);

  &:hover {
    background: var(--tx-body-bg);
  }
}

.tx-collapse-label {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--tx-text);
}

.tx-collapse-chevron {
  font-size: 1rem;
  color: var(--tx-text-muted);
  transition: transform 0.2s ease;
}

.tx-collapse-body {
  padding: 0.85rem 1rem 1rem 2.65rem;
  font-size: 0.875rem;
  color: var(--tx-text-muted);
  line-height: 1.65;
  background: var(--tx-body-bg);
  border-top: 1px solid var(--tx-border-subtle);
}

.tx-message-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tx-breadcrumb-list {
  display: flex;
  flex-direction: column;
}

.tx-offcanvas-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.tx-offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--tx-border);
}

.tx-offcanvas-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--tx-text-heading);
}

.tx-offcanvas-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tx-offcanvas-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--tx-border);
}
</style>
