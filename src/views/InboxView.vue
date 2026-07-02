<template>
  <div>
    <!-- Page header -->
    <div class="tx-inbox-head">
      <div>
        <h1 class="title is-5" style="margin-bottom: 0.15rem;">Caixa de entrada</h1>
        <p class="is-size-7 has-text-grey">Gerencie suas mensagens em um só lugar.</p>
      </div>
      <b-button type="is-primary" icon-left="email-plus" @click="composeOpen = true">
        Escrever
      </b-button>
    </div>

    <div class="columns">
      <!-- Folders -->
      <aside class="column is-3-desktop is-2-widescreen is-hidden-touch">
        <div class="box" style="padding: 0.5rem;">
          <aside class="menu">
            <ul class="menu-list">
              <li v-for="f in FOLDERS" :key="f.id">
                <a
                  :class="{ 'is-active': activeFolder === f.id }"
                  class="tx-folder-link"
                  @click="changeFolder(f.id)"
                >
                  <span class="tx-folder-label">
                    <span class="mdi" :class="f.icon" />
                    {{ f.label }}
                  </span>
                  <span
                    v-if="folderCounts[f.id] > 0"
                    class="tag is-rounded"
                    :class="activeFolder === f.id ? 'is-primary' : 'is-light'"
                  >
                    {{ folderCounts[f.id] }}
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </aside>

      <!-- Mobile folder selector -->
      <div class="column is-12 is-hidden-desktop">
        <b-field>
          <b-select v-model="activeFolder" expanded icon="folder" @update:model-value="selectedId = null">
            <option v-for="f in FOLDERS" :key="f.id" :value="f.id">
              {{ f.label }}{{ folderCounts[f.id] > 0 ? ` (${folderCounts[f.id]})` : '' }}
            </option>
          </b-select>
        </b-field>
      </div>

      <!-- List -->
      <section
        class="column is-4-desktop is-4-widescreen"
        :class="{ 'is-hidden-touch': selected }"
      >
        <div class="box" style="padding: 0;">
          <div class="tx-inbox-search">
            <b-input
              v-model="search"
              placeholder="Buscar e-mails..."
              icon="magnify"
              size="is-small"
              expanded
            />
          </div>
          <ul class="tx-email-list">
            <li v-for="e in list" :key="e.id">
              <a
                class="tx-email-item"
                :class="{ 'is-selected': selectedId === e.id }"
                @click="openEmail(e.id)"
              >
                <span class="tx-email-avatar" :style="{ '--avatar-color': e.accent }">
                  {{ e.initials }}
                </span>
                <div class="tx-email-main">
                  <div class="tx-email-row">
                    <span class="tx-email-sender" :class="{ 'is-unread': e.unread }">
                      {{ e.sender }}
                    </span>
                    <span class="is-size-7 has-text-grey">{{ e.time }}</span>
                  </div>
                  <p class="tx-email-subject" :class="{ 'is-unread': e.unread }">
                    {{ e.subject }}
                  </p>
                  <p class="tx-email-preview">{{ e.preview }}</p>
                </div>
                <div class="tx-email-aside">
                  <span v-if="e.unread" class="tx-email-dot" />
                  <span
                    class="tx-email-star"
                    :class="{ 'is-starred': e.starred }"
                    role="button"
                    tabindex="0"
                    @click.stop="toggleStar(e.id)"
                  >
                    <span class="mdi" :class="e.starred ? 'mdi-star' : 'mdi-star-outline'" />
                  </span>
                </div>
              </a>
            </li>
            <li v-if="list.length === 0" class="tx-email-empty">
              <span class="mdi mdi-email-off-outline" style="font-size: 1.6rem;" />
              <p class="is-size-7 has-text-grey">Nenhuma mensagem nesta pasta.</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Reading pane -->
      <section
        class="column"
        :class="{ 'is-hidden-touch': !selected }"
      >
        <div class="box tx-reading-pane">
          <template v-if="selected">
            <header class="tx-reading-head">
              <div class="tx-reading-from">
                <b-button
                  class="is-hidden-desktop"
                  size="is-small"
                  type="is-light"
                  icon-left="arrow-left"
                  aria-label="Voltar"
                  @click="selectedId = null"
                />
                <span class="tx-email-avatar is-large" :style="{ '--avatar-color': selected.accent }">
                  {{ selected.initials }}
                </span>
                <div>
                  <h2 class="tx-reading-subject">{{ selected.subject }}</h2>
                  <p class="is-size-7" style="color: var(--tx-text);">{{ selected.sender }}</p>
                  <p class="is-size-7 has-text-grey">{{ selected.email }}</p>
                </div>
              </div>
              <div class="tx-reading-actions">
                <b-tooltip label="Favoritar" type="is-dark">
                  <b-button
                    size="is-small"
                    type="is-light"
                    :icon-left="selected.starred ? 'star' : 'star-outline'"
                    :class="{ 'tx-star-active': selected.starred }"
                    @click="toggleStar(selected.id)"
                  />
                </b-tooltip>
                <b-tooltip label="Arquivar" type="is-dark">
                  <b-button
                    size="is-small"
                    type="is-light"
                    icon-left="download"
                    @click="ui.notifySuccess('Mensagem arquivada')"
                  />
                </b-tooltip>
                <b-tooltip label="Excluir" type="is-dark">
                  <b-button
                    size="is-small"
                    type="is-light"
                    icon-left="delete"
                    @click="deleteEmail"
                  />
                </b-tooltip>
              </div>
            </header>
            <div class="tx-reading-body">{{ selected.body }}</div>
            <footer class="tx-reading-foot">
              <b-button type="is-light" icon-left="reply" @click="composeOpen = true">
                Responder
              </b-button>
            </footer>
          </template>
          <div v-else class="tx-reading-empty">
            <span class="tx-reading-empty-icon">
              <span class="mdi mdi-email-outline" />
            </span>
            <p class="has-text-weight-medium" style="color: var(--tx-text-heading);">
              Selecione uma mensagem
            </p>
            <p class="is-size-7 has-text-grey">
              Escolha um e-mail na lista para visualizar o conteúdo.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Compose modal -->
    <b-modal v-model="composeOpen" has-modal-card trap-focus>
      <div class="modal-card" style="width: 560px; max-width: 100%;">
        <header class="modal-card-head">
          <div>
            <p class="modal-card-title">Nova mensagem</p>
            <p class="is-size-7 has-text-grey">Escreva e envie um e-mail</p>
          </div>
          <button class="delete" @click="composeOpen = false" />
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="sendMessage">
            <b-field label="Para">
              <b-input v-model="composeForm.to" type="email" required placeholder="destinatario@email.com" icon="account" expanded />
            </b-field>
            <b-field label="Assunto">
              <b-input v-model="composeForm.subject" required placeholder="Assunto da mensagem" icon="format-title" expanded />
            </b-field>
            <b-field label="Mensagem">
              <b-input v-model="composeForm.body" type="textarea" :rows="6" placeholder="Escreva sua mensagem..." />
            </b-field>
          </form>
        </section>
        <footer class="modal-card-foot tx-modal-foot">
          <b-button @click="composeOpen = false">Cancelar</b-button>
          <b-button type="is-primary" icon-left="send" @click="sendMessage">Enviar</b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'

type FolderId = 'inbox' | 'sent' | 'drafts' | 'starred' | 'trash'

interface Folder {
  id: FolderId
  label: string
  icon: string
}

interface Email {
  id: string
  folder: FolderId
  sender: string
  initials: string
  email: string
  subject: string
  preview: string
  body: string
  time: string
  unread: boolean
  starred: boolean
  accent: string
}

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Caixa de entrada'))

const FOLDERS: Folder[] = [
  { id: 'inbox', label: 'Caixa de entrada', icon: 'mdi-email' },
  { id: 'sent', label: 'Enviados', icon: 'mdi-send' },
  { id: 'drafts', label: 'Rascunhos', icon: 'mdi-pencil' },
  { id: 'starred', label: 'Com estrela', icon: 'mdi-star' },
  { id: 'trash', label: 'Lixeira', icon: 'mdi-delete' },
]

const ACCENTS = ['#485fc7', '#48c774', '#f59e0b', '#f14668', '#3273dc']

const emails = ref<Email[]>([
  {
    id: '1',
    folder: 'inbox',
    sender: 'Marina Costa',
    initials: 'MC',
    email: 'marina.costa@empresa.com',
    subject: 'Proposta comercial atualizada',
    preview: 'Olá! Segue em anexo a versão revisada da proposta com os novos valores...',
    body: 'Olá!\n\nSegue em anexo a versão revisada da proposta comercial com os novos valores discutidos na reunião de ontem. Ajustei as condições de pagamento e incluí o desconto para contrato anual.\n\nPode revisar e me dizer se podemos seguir? Fico no aguardo.\n\nAbraços,\nMarina',
    time: '09:42',
    unread: true,
    starred: true,
    accent: ACCENTS[0],
  },
  {
    id: '2',
    folder: 'inbox',
    sender: 'Equipe Financeiro',
    initials: 'EF',
    email: 'financeiro@empresa.com',
    subject: 'Fatura de maio disponível',
    preview: 'Sua fatura referente ao mês de maio já está disponível para download...',
    body: 'Prezado cliente,\n\nSua fatura referente ao mês de maio já está disponível para download no portal. O vencimento é dia 10/06/2026.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe Financeiro',
    time: '08:15',
    unread: true,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '3',
    folder: 'inbox',
    sender: 'Lucas Pereira',
    initials: 'LP',
    email: 'lucas.p@parceiro.io',
    subject: 'Re: Integração da API',
    preview: 'Perfeito, consegui rodar os testes aqui e tudo passou. Vamos para produção?',
    body: 'Fala!\n\nPerfeito, consegui rodar os testes aqui no ambiente de homologação e tudo passou sem erros. As credenciais novas funcionaram normalmente.\n\nPodemos agendar o deploy para produção ainda esta semana?\n\nValeu,\nLucas',
    time: 'Ontem',
    unread: true,
    starred: false,
    accent: ACCENTS[2],
  },
  {
    id: '4',
    folder: 'inbox',
    sender: 'Aline Souza',
    initials: 'AS',
    email: 'aline.souza@design.co',
    subject: 'Mockups da nova landing page',
    preview: 'Terminei os mockups da home e da página de preços. Dá uma olhada...',
    body: 'Oi!\n\nTerminei os mockups da home e da página de preços. Tentei seguir o novo guia de marca com as cores atualizadas.\n\nDeixei os arquivos no Figma, o link está no canal do projeto. Aguardo seu feedback!\n\nAbraços,\nAline',
    time: 'Ontem',
    unread: false,
    starred: true,
    accent: ACCENTS[3],
  },
  {
    id: '5',
    folder: 'inbox',
    sender: 'Rafael Lima',
    initials: 'RL',
    email: 'rafael@enterprise.com',
    subject: 'Reunião de alinhamento - quinta',
    preview: 'Pessoal, vamos confirmar a reunião de alinhamento para quinta às 14h?',
    body: 'Pessoal,\n\nVamos confirmar a reunião de alinhamento para quinta-feira às 14h? Pauta:\n\n- Roadmap do trimestre\n- Métricas de retenção\n- Próximos contratos\n\nMandem confirmação de presença.\n\nObrigado,\nRafael',
    time: '23 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[4],
  },
  {
    id: '6',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Re: Proposta comercial atualizada',
    preview: 'Recebido, Marina! Vou revisar hoje à tarde e te retorno até amanhã.',
    body: 'Recebido, Marina!\n\nVou revisar hoje à tarde e te retorno até amanhã com qualquer ajuste necessário. À primeira vista parece ótimo.\n\nObrigado,',
    time: '10:05',
    unread: false,
    starred: false,
    accent: ACCENTS[0],
  },
  {
    id: '7',
    folder: 'sent',
    sender: 'Você',
    initials: 'EU',
    email: 'voce@empresa.com',
    subject: 'Relatório semanal',
    preview: 'Segue o relatório semanal com os principais indicadores da equipe.',
    body: 'Time,\n\nSegue o relatório semanal com os principais indicadores. Crescemos 8% em conversões e reduzimos o tempo de resposta do suporte.\n\nDetalhes no anexo.',
    time: '22 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[1],
  },
  {
    id: '8',
    folder: 'drafts',
    sender: 'Rascunho',
    initials: 'RA',
    email: 'voce@empresa.com',
    subject: 'Ideias para o próximo evento',
    preview: 'Algumas ideias iniciais para o evento de lançamento do produto...',
    body: 'Algumas ideias iniciais para o evento de lançamento do produto:\n\n- Local: auditório principal\n- Formato híbrido (presencial + online)\n- Convidar parceiros estratégicos\n\n(rascunho não finalizado)',
    time: '20 mai',
    unread: false,
    starred: false,
    accent: ACCENTS[2],
  },
])

const activeFolder = ref<FolderId>('inbox')
const selectedId = ref<string | null>('1')
const search = ref('')
const composeOpen = ref(false)
const composeForm = reactive({ to: '', subject: '', body: '' })

const folderCounts = computed<Record<FolderId, number>>(() => {
  const counts: Record<FolderId, number> = { inbox: 0, sent: 0, drafts: 0, starred: 0, trash: 0 }
  for (const e of emails.value) {
    if (e.folder === 'inbox' && e.unread) counts.inbox++
    if (e.folder === 'sent') counts.sent++
    if (e.folder === 'drafts') counts.drafts++
    if (e.starred) counts.starred++
    if (e.folder === 'trash') counts.trash++
  }
  return counts
})

const list = computed(() =>
  emails.value.filter((e) => {
    const inFolder = activeFolder.value === 'starred' ? e.starred : e.folder === activeFolder.value
    if (!inFolder) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      return (
        e.sender.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q)
      )
    }
    return true
  })
)

const selected = computed(() => emails.value.find((e) => e.id === selectedId.value) ?? null)

function openEmail(id: string) {
  selectedId.value = id
  const e = emails.value.find((m) => m.id === id)
  if (e) e.unread = false
}

function toggleStar(id: string) {
  const e = emails.value.find((m) => m.id === id)
  if (e) e.starred = !e.starred
}

function changeFolder(id: FolderId) {
  activeFolder.value = id
  selectedId.value = null
}

function deleteEmail() {
  if (!selected.value) return
  selected.value.folder = 'trash'
  selectedId.value = null
  ui.notifySuccess('Mensagem movida para a lixeira')
}

function sendMessage() {
  composeOpen.value = false
  composeForm.to = ''
  composeForm.subject = ''
  composeForm.body = ''
  ui.notifySuccess('Mensagem enviada com sucesso')
}
</script>

<style scoped>
.tx-inbox-head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
@media (min-width: 769px) {
  .tx-inbox-head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

/* Bulma's `.menu-list a` (specificity 0,1,1) outranks `.tx-folder-link`, so
   scope to `.menu-list a.tx-folder-link` to win and lay out the label + count
   badge in one row instead of letting the badge wrap below as a big circle. */
.menu-list a.tx-folder-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.tx-folder-link .tag {
  flex-shrink: 0;
}
/* On the active (primary) folder, keep the count badge readable */
.menu-list a.tx-folder-link.is-active .tag.is-primary {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}
.tx-folder-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}
.tx-folder-label .mdi {
  font-size: 1.1rem;
}

.tx-inbox-search {
  padding: 0.75rem;
  border-bottom: 1px solid var(--tx-border-subtle);
}

.tx-email-list {
  max-height: 640px;
  overflow-y: auto;
}
.tx-email-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--tx-border-subtle);
  transition: background var(--tx-transition);
  cursor: pointer;
}
.tx-email-item:hover {
  background: var(--tx-body-bg);
}
.tx-email-item.is-selected {
  background: rgba(72, 95, 199, 0.08);
}
.tx-email-avatar {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: var(--avatar-color, var(--tx-primary));
}
.tx-email-avatar.is-large {
  width: 2.75rem;
  height: 2.75rem;
  font-size: 0.85rem;
}
.tx-email-main {
  min-width: 0;
  flex: 1;
}
.tx-email-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.tx-email-sender {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  color: var(--tx-text);
}
.tx-email-sender.is-unread {
  font-weight: 600;
  color: var(--tx-text-heading);
}
.tx-email-subject {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  color: var(--tx-text-muted);
}
.tx-email-subject.is-unread {
  font-weight: 500;
  color: var(--tx-text-heading);
}
.tx-email-preview {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  color: var(--tx-text-muted);
}
.tx-email-aside {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.tx-email-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--tx-primary);
}
.tx-email-star {
  margin-top: auto;
  color: var(--tx-text-light);
  cursor: pointer;
}
.tx-email-star:hover,
.tx-email-star.is-starred {
  color: var(--tx-warning);
}
.tx-email-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
  color: var(--tx-text-muted);
}

.tx-reading-pane {
  padding: 0;
  min-height: 460px;
  display: flex;
  flex-direction: column;
}
.tx-reading-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.25rem;
  border-bottom: 1px solid var(--tx-border-subtle);
}
.tx-reading-from {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.tx-reading-subject {
  font-size: 1rem;
  font-weight: 600;
  color: var(--tx-text-heading);
}
.tx-reading-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.tx-reading-actions :deep(.tx-star-active) .mdi {
  color: var(--tx-warning);
}
.tx-reading-body {
  flex: 1;
  padding: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--tx-text);
  white-space: pre-line;
}
.tx-reading-foot {
  padding: 1.25rem;
  border-top: 1px solid var(--tx-border-subtle);
}
.tx-reading-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 400px;
  padding: 2.5rem;
  text-align: center;
}
.tx-reading-empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--tx-radius);
  background: rgba(72, 95, 199, 0.1);
  color: var(--tx-primary);
}
.tx-reading-empty-icon .mdi {
  font-size: 1.6rem;
}
.tx-modal-foot {
  justify-content: flex-end;
}
</style>
