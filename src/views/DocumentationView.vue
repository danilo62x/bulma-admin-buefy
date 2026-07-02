<template>
  <div>
    <div style="margin-bottom: 1.25rem;">
      <h1 class="title is-4" style="margin-bottom: 0.25rem;">Documentação</h1>
      <p class="subtitle is-6 has-text-grey">Guia completo de uso do template e da API.</p>
    </div>

    <div class="columns">
      <!-- Sidebar TOC -->
      <div class="column is-3">
        <aside class="tx-doc-toc">
          <div class="box">
            <div class="field" style="margin-bottom: 0.75rem;">
              <div class="control has-icons-left">
                <input v-model="search" class="input is-small" type="text" placeholder="Buscar na documentação..." />
                <span class="icon is-left"><i class="mdi mdi-magnify" /></span>
              </div>
            </div>
            <p class="tx-doc-toc-title">Nesta página</p>
            <aside class="menu">
              <ul class="menu-list">
                <li v-for="s in filteredSections" :key="s.id">
                  <a
                    :href="`#${s.id}`"
                    :class="{ 'is-active': active === s.id }"
                    @click="active = s.id"
                  >
                    <span class="mdi" :class="s.icon" style="margin-right: 0.5rem;" />
                    {{ s.label }}
                  </a>
                </li>
              </ul>
              <p v-if="filteredSections.length === 0" class="has-text-grey is-size-7" style="padding: 0.5rem 0.75rem;">
                Nenhuma seção encontrada.
              </p>
            </aside>
          </div>
        </aside>
      </div>

      <!-- Main content -->
      <div class="column is-9">
        <article class="box tx-doc-article">
          <!-- Introdução -->
          <section class="tx-doc-section">
            <h2 id="introducao" class="tx-doc-heading">Introdução</h2>
            <p class="tx-doc-text">
              Bem-vindo à documentação do <strong>Admin Template</strong>. Este guia cobre desde a
              instalação até o uso avançado dos componentes e da API. O template é construído com Vue 3,
              Vite, Bulma, Buefy e TypeScript, priorizando performance e suporte completo a modo escuro.
            </p>
            <div class="notification is-info is-light tx-doc-callout">
              <span class="mdi mdi-information-outline tx-doc-callout-icon" />
              <div>
                <p class="has-text-weight-semibold">Dica</p>
                <p class="is-size-7" style="margin-top: 0.25rem;">
                  Recomendamos usar Node.js 20 ou superior para garantir compatibilidade total com o Vite.
                </p>
              </div>
            </div>
          </section>

          <!-- Instalação -->
          <section class="tx-doc-section">
            <h2 id="instalacao" class="tx-doc-heading">Instalação</h2>
            <p class="tx-doc-text">
              Clone o repositório e instale as dependências usando seu gerenciador de pacotes preferido:
            </p>
            <CodeBlock :code="installCode" />
            <p class="tx-doc-text">
              A aplicação ficará disponível em <code class="tx-doc-code">http://localhost:5173</code>.
            </p>
          </section>

          <!-- Configuração -->
          <section class="tx-doc-section">
            <h2 id="configuracao" class="tx-doc-heading">Configuração</h2>
            <p class="tx-doc-text">
              As variáveis de ambiente são definidas em um arquivo <code class="tx-doc-code">.env</code> na raiz do projeto:
            </p>
            <CodeBlock :code="envCode" />
            <div class="notification is-warning is-light tx-doc-callout">
              <span class="mdi mdi-alert-outline tx-doc-callout-icon" />
              <div>
                <p class="has-text-weight-semibold">Atenção</p>
                <p class="is-size-7" style="margin-top: 0.25rem;">
                  Nunca faça commit do arquivo <code class="tx-doc-code">.env</code> em repositórios públicos.
                  Adicione-o ao <code class="tx-doc-code">.gitignore</code>.
                </p>
              </div>
            </div>
          </section>

          <!-- Componentes -->
          <section class="tx-doc-section">
            <h2 id="componentes" class="tx-doc-heading">Componentes</h2>
            <p class="tx-doc-text">
              O template inclui um conjunto de componentes reutilizáveis. A tabela abaixo resume os principais:
            </p>
            <div class="table-container">
              <table class="table is-fullwidth tx-doc-table">
                <thead>
                  <tr>
                    <th>Componente</th>
                    <th>Descrição</th>
                    <th>Props</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code class="tx-doc-code">CardComponent</code></td>
                    <td>Container de seção com cabeçalho e rodapé.</td>
                    <td class="has-text-grey">title, icon, footer</td>
                  </tr>
                  <tr>
                    <td><code class="tx-doc-code">StatsCard</code></td>
                    <td>Cartão de métrica com tendência.</td>
                    <td class="has-text-grey">value, color, trend</td>
                  </tr>
                  <tr>
                    <td><code class="tx-doc-code">DataTable</code></td>
                    <td>Tabela com ordenação e paginação.</td>
                    <td class="has-text-grey">columns, data</td>
                  </tr>
                  <tr>
                    <td><code class="tx-doc-code">b-table</code></td>
                    <td>Tabela Buefy com seleção e detalhes.</td>
                    <td class="has-text-grey">data, columns</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="tx-doc-text">Exemplo de uso do <code class="tx-doc-code">StatsCard</code>:</p>
            <CodeBlock :code="statsCardCode" />
          </section>

          <!-- API -->
          <section class="tx-doc-section">
            <h2 id="api" class="tx-doc-heading">API</h2>
            <p class="tx-doc-text">
              A API REST utiliza autenticação via token Bearer. Inclua o cabeçalho
              <code class="tx-doc-code">Authorization</code> em todas as requisições autenticadas:
            </p>
            <CodeBlock :code="curlCode" />
            <div class="table-container">
              <table class="table is-fullwidth tx-doc-table">
                <thead>
                  <tr>
                    <th>Método</th>
                    <th>Endpoint</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="tag is-success is-light tx-doc-method">GET</span></td>
                    <td><code class="tx-doc-code">/v1/users</code></td>
                    <td class="has-text-grey">Lista todos os usuários.</td>
                  </tr>
                  <tr>
                    <td><span class="tag is-primary is-light tx-doc-method">POST</span></td>
                    <td><code class="tx-doc-code">/v1/users</code></td>
                    <td class="has-text-grey">Cria um novo usuário.</td>
                  </tr>
                  <tr>
                    <td><span class="tag is-danger is-light tx-doc-method">DELETE</span></td>
                    <td><code class="tx-doc-code">/v1/users/:id</code></td>
                    <td class="has-text-grey">Remove um usuário.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- FAQ -->
          <section class="tx-doc-section">
            <h2 id="faq" class="tx-doc-heading">FAQ</h2>
            <div class="tx-doc-faq-list">
              <div v-for="item in faq" :key="item.q" class="tx-doc-faq-item">
                <p class="tx-doc-faq-q">
                  <span class="mdi mdi-help-circle-outline" style="color: var(--tx-primary); margin-right: 0.5rem;" />
                  {{ item.q }}
                </p>
                <p class="tx-doc-faq-a">{{ item.a }}</p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h, defineComponent, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Documentação'))

const SECTIONS = [
  { id: 'introducao', label: 'Introdução', icon: 'mdi-information-outline' },
  { id: 'instalacao', label: 'Instalação', icon: 'mdi-download' },
  { id: 'configuracao', label: 'Configuração', icon: 'mdi-cog' },
  { id: 'componentes', label: 'Componentes', icon: 'mdi-view-grid-outline' },
  { id: 'api', label: 'API', icon: 'mdi-web' },
  { id: 'faq', label: 'FAQ', icon: 'mdi-help-circle-outline' },
]

const search = ref('')
const active = ref('introducao')

const filteredSections = computed(() => {
  if (!search.value.trim()) return SECTIONS
  return SECTIONS.filter((s) => s.label.toLowerCase().includes(search.value.toLowerCase()))
})

const faq = [
  { q: 'Posso usar o template em projetos comerciais?', a: 'Sim. A licença permite uso em projetos comerciais ilimitados após a compra.' },
  { q: 'O template suporta modo escuro?', a: 'Sim, todo o template foi construído com suporte nativo a modo claro e escuro.' },
  { q: 'Como reporto um bug?', a: 'Abra uma issue no repositório do GitHub com passos para reproduzir o problema.' },
]

const installCode = `# Clonar o projeto
git clone https://github.com/acme/admin-template.git
cd admin-template

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev`

const envCode = `VITE_API_URL=https://api.acme.com.br
VITE_APP_NAME="Admin Template"
VITE_ENABLE_ANALYTICS=true`

const statsCardCode = `import StatsCard from '@/components/ui/StatsCard.vue'

<StatsCard
  label="Receita"
  value="R$ 89.450"
  icon="mdi-cash"
  color="#485fc7"
  trend="11,01%"
  :trend-up="true"
/>`

const curlCode = `curl https://api.acme.com.br/v1/users \\
  -H "Authorization: Bearer SEU_TOKEN" \\
  -H "Content-Type: application/json"`

const CodeBlock = defineComponent({
  props: { code: { type: String, required: true } },
  setup(props) {
    return () =>
      h('div', { class: 'tx-doc-codeblock' }, [
        h(
          'button',
          {
            type: 'button',
            class: 'button is-small tx-doc-copy',
            onClick: () => ui.notifySuccess('Código copiado!'),
          },
          [h('span', { class: 'mdi mdi-content-copy' }), ' Copiar']
        ),
        h('pre', { class: 'tx-doc-pre' }, h('code', props.code)),
      ])
  },
})
</script>

<style scoped>
.tx-doc-toc {
  position: sticky;
  top: calc(var(--tx-header-height) + 1.5rem);
}
.tx-doc-toc-title {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--tx-text-muted);
  padding: 0 0.5rem 0.5rem;
}
.tx-doc-article {
  padding: 2rem;
}
.tx-doc-section {
  margin-bottom: 2.5rem;
}
.tx-doc-section:last-child {
  margin-bottom: 0;
}
.tx-doc-heading {
  scroll-margin-top: calc(var(--tx-header-height) + 1.5rem);
  border-bottom: 1px solid var(--tx-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--tx-text-heading);
}
.tx-doc-text {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--tx-text);
  margin-bottom: 1rem;
}
.tx-doc-text:last-child {
  margin-bottom: 0;
}
.tx-doc-code {
  border-radius: 4px;
  background: var(--tx-body-bg);
  padding: 0.1rem 0.4rem;
  font-family: monospace;
  font-size: 0.78rem;
  color: var(--tx-primary);
}
.tx-doc-callout {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.tx-doc-callout-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.tx-doc-table thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tx-text-muted);
}
.tx-doc-method {
  font-family: monospace;
  font-weight: 700;
}
.tx-doc-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.tx-doc-faq-item {
  border: 1px solid var(--tx-border);
  border-radius: var(--tx-radius);
  padding: 1rem;
}
.tx-doc-faq-q {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--tx-text-heading);
}
.tx-doc-faq-a {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  font-size: 0.875rem;
  color: var(--tx-text);
}

/* Code block (rendered via h()) */
:deep(.tx-doc-codeblock) {
  position: relative;
  margin: 1rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a2a;
}
:deep(.tx-doc-copy) {
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #d4d4d8;
}
:deep(.tx-doc-copy:hover) {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}
:deep(.tx-doc-pre) {
  overflow-x: auto;
  padding: 1rem;
  background: transparent;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #e4e4e7;
}
:deep(.tx-doc-pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  font-family: monospace;
}
</style>
