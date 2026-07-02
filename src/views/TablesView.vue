<template>
  <div>

    <!-- ── Tabela de Usuários ──────────────────────────────── -->
    <CardComponent title="Gerenciamento de Usuários" icon="mdi-account-group">
      <template #toolbar>
        <div class="tx-table-toolbar">
          <div class="tx-table-search">
            <b-input
              v-model="search"
              placeholder="Buscar..."
              icon="magnify"
              size="is-small"
              expanded
            />
          </div>
          <b-button size="is-small" type="is-primary" icon-left="plus" @click="openAddModal">
            Novo
          </b-button>
          <b-button size="is-small" type="is-light" icon-left="download">
            Exportar
          </b-button>
        </div>
      </template>

      <!-- Bulk actions bar -->
      <div v-if="checkedRows.length > 0" class="tx-bulk-bar">
        <span class="tx-bulk-count">
          <span class="mdi mdi-checkbox-multiple-marked" />
          {{ checkedRows.length }} selecionado{{ checkedRows.length > 1 ? 's' : '' }}
        </span>
        <b-button size="is-small" type="is-danger" outlined icon-left="delete" @click="bulkDelete">
          Excluir selecionados
        </b-button>
        <b-button size="is-small" type="is-light" icon-left="close" @click="checkedRows = []">
          Limpar seleção
        </b-button>
      </div>

      <b-table
        :data="filteredUsers"
        :striped="true"
        :hoverable="true"
        :loading="loading"
        :paginated="true"
        :per-page="perPageUsers"
        :current-page.sync="currentPageUsers"
        pagination-position="bottom"
        :pagination-rounded="true"
        :mobile-cards="false"
        checkable
        :checked-rows="checkedRows"
        default-sort="id"
        default-sort-direction="asc"
        @check="(list: UserRow[]) => (checkedRows = list)"
      >
        <b-table-column field="id" label="#" sortable width="60" v-slot="{ row }">
          <span class="tx-row-id">#{{ row.id }}</span>
        </b-table-column>

        <b-table-column field="name" label="Nome" sortable v-slot="{ row }">
          <div class="tx-row-name">
            <div class="tx-row-avatar" :style="{ '--avatar-color': row.color }">
              {{ row.name[0] }}
            </div>
            {{ row.name }}
          </div>
        </b-table-column>

        <b-table-column field="email" label="E-mail" sortable v-slot="{ row }">
          <a :href="'mailto:' + row.email" style="color: var(--tx-text);">{{ row.email }}</a>
        </b-table-column>

        <b-table-column field="role" label="Perfil" sortable v-slot="{ row }">
          <span class="tag is-light">{{ row.role }}</span>
        </b-table-column>

        <b-table-column field="status" label="Status" sortable centered v-slot="{ row }">
          <span class="tag" :class="row.status === 'Ativo' ? 'is-success is-light' : 'is-danger is-light'">
            <span class="mdi" :class="row.status === 'Ativo' ? 'mdi-check-circle' : 'mdi-close-circle'" />
            {{ row.status }}
          </span>
        </b-table-column>

        <b-table-column field="date" label="Cadastro" sortable v-slot="{ row }">
          {{ row.date }}
        </b-table-column>

        <b-table-column label="Ações" centered v-slot="{ row }">
          <div class="tx-row-actions">
            <b-tooltip label="Editar" type="is-dark">
              <b-button size="is-small" type="is-info" icon-left="pencil" outlined @click="openEditModal(row)" />
            </b-tooltip>
            <b-tooltip label="Excluir" type="is-dark">
              <b-button size="is-small" type="is-danger" icon-left="delete" outlined @click="openDeleteModal(row)" />
            </b-tooltip>
          </div>
        </b-table-column>

        <template #empty>
          <div class="tx-table-empty">
            <span class="mdi mdi-magnify tx-table-empty-icon" />
            Nenhum resultado encontrado
          </div>
        </template>
      </b-table>

      <div class="tx-table-footer">
        <span class="tx-table-count">
          Exibindo {{ filteredUsers.length }} de {{ usersData.length }} registros
        </span>
        <b-field style="margin: 0;">
          <b-select v-model="perPageUsers" size="is-small">
            <option :value="5">5 por página</option>
            <option :value="10">10 por página</option>
            <option :value="20">20 por página</option>
          </b-select>
        </b-field>
      </div>
    </CardComponent>

    <!-- ── Tabela de Produtos (expandable rows) ────────────── -->
    <CardComponent title="Catálogo de Produtos" icon="mdi-package-variant" style="margin-top: 1rem;">
      <template #toolbar>
        <div class="tx-table-toolbar">
          <div class="tx-table-search">
            <b-input
              v-model="productSearch"
              placeholder="Buscar produto..."
              icon="magnify"
              size="is-small"
              expanded
            />
          </div>
          <b-select v-model="productCategory" size="is-small" placeholder="Categoria">
            <option value="">Todas</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Periférico">Periférico</option>
            <option value="Acessório">Acessório</option>
          </b-select>
        </div>
      </template>

      <b-table
        :data="filteredProducts"
        :striped="true"
        :hoverable="true"
        :paginated="true"
        :per-page="10"
        :mobile-cards="false"
        detailed
        show-detail-icon
        detail-key="id"
        default-sort="name"
      >
        <b-table-column field="name" label="Produto" sortable v-slot="{ row }">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="mdi" :class="row.icon" :style="{ color: row.color, fontSize: '1.3rem' }" />
            <span style="font-weight: 500;">{{ row.name }}</span>
          </div>
        </b-table-column>

        <b-table-column field="category" label="Categoria" sortable v-slot="{ row }">
          <span class="tag is-info is-light">{{ row.category }}</span>
        </b-table-column>

        <b-table-column field="price" label="Preço" sortable numeric v-slot="{ row }">
          <strong>R$ {{ row.price.toFixed(2) }}</strong>
        </b-table-column>

        <b-table-column field="stock" label="Estoque" sortable centered v-slot="{ row }">
          <span class="tag" :class="row.stock > 10 ? 'is-success is-light' : row.stock > 0 ? 'is-warning is-light' : 'is-danger is-light'">
            {{ row.stock > 0 ? row.stock + ' un.' : 'Esgotado' }}
          </span>
        </b-table-column>

        <b-table-column field="rating" label="Avaliação" centered v-slot="{ row }">
          <b-rate :model-value="row.rating" :max="5" size="is-small" disabled />
        </b-table-column>

        <b-table-column label="Status" centered v-slot="{ row }">
          <b-switch
            :model-value="row.active"
            type="is-success"
            size="is-small"
            @update:model-value="(v: boolean) => (row.active = v)"
          />
        </b-table-column>

        <template #detail="{ row }">
          <div class="tx-detail-row">
            <div class="tx-detail-grid">
              <div>
                <p class="tx-detail-label">Descrição</p>
                <p class="tx-detail-value">{{ row.description }}</p>
              </div>
              <div>
                <p class="tx-detail-label">SKU</p>
                <p class="tx-detail-value">{{ row.sku }}</p>
              </div>
              <div>
                <p class="tx-detail-label">Fornecedor</p>
                <p class="tx-detail-value">{{ row.supplier }}</p>
              </div>
              <div>
                <p class="tx-detail-label">Peso</p>
                <p class="tx-detail-value">{{ row.weight }}</p>
              </div>
              <div>
                <p class="tx-detail-label">Cadastrado em</p>
                <p class="tx-detail-value">{{ row.createdAt }}</p>
              </div>
              <div>
                <p class="tx-detail-label">Vendas</p>
                <p class="tx-detail-value">{{ row.sales }} unidades</p>
              </div>
            </div>
          </div>
        </template>

        <template #empty>
          <div class="tx-table-empty">
            <span class="mdi mdi-package-variant tx-table-empty-icon" />
            Nenhum produto encontrado
          </div>
        </template>
      </b-table>
    </CardComponent>

    <!-- ── Modal: Criar / Editar usuário ──────────────────── -->
    <b-modal v-model:modelValue="showUserModal" has-modal-card trap-focus>
      <div class="modal-card" style="width: 480px; max-width: 100%;">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ editingUser ? 'Editar Usuário' : 'Novo Usuário' }}</p>
          <button class="delete" @click="showUserModal = false" />
        </header>
        <section class="modal-card-body">
          <b-field label="Nome" :type="!userForm.name ? 'is-danger' : ''" :message="!userForm.name ? 'Nome obrigatório' : ''">
            <b-input v-model="userForm.name" placeholder="Nome completo" icon="account" expanded />
          </b-field>
          <b-field label="E-mail" :type="!userForm.email ? 'is-danger' : ''" :message="!userForm.email ? 'E-mail obrigatório' : ''">
            <b-input v-model="userForm.email" type="email" placeholder="email@exemplo.com" icon="email" expanded />
          </b-field>
          <b-field label="Telefone">
            <b-input v-model="userForm.phone" placeholder="(11) 99999-9999" icon="phone" expanded />
          </b-field>
          <b-field label="Perfil">
            <b-select v-model="userForm.role" expanded icon="account-cog">
              <option value="Administrador">Administrador</option>
              <option value="Gerente">Gerente</option>
              <option value="Operador">Operador</option>
              <option value="Visualizador">Visualizador</option>
            </b-select>
          </b-field>
          <b-field label="Status">
            <b-switch v-model="userForm.active" type="is-success">
              {{ userForm.active ? 'Ativo' : 'Inativo' }}
            </b-switch>
          </b-field>
        </section>
        <footer class="modal-card-foot tx-modal-foot">
          <b-button @click="showUserModal = false">Cancelar</b-button>
          <b-button type="is-primary" icon-left="content-save" @click="saveUser">Salvar</b-button>
        </footer>
      </div>
    </b-modal>

    <!-- ── Modal: Confirmar exclusão ─────────────────────── -->
    <b-modal v-model:modelValue="showDeleteModal" has-modal-card trap-focus>
      <div class="modal-card" style="width: 400px; max-width: 100%;">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirmar exclusão</p>
        </header>
        <section class="modal-card-body">
          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <span class="mdi mdi-alert-circle" style="font-size: 2rem; color: var(--tx-danger); flex-shrink: 0;" />
            <div>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--tx-text-heading);">
                Excluir "{{ deletingUser?.name }}"?
              </p>
              <p style="font-size: 0.875rem; color: var(--tx-text-muted); margin-top: 0.5rem;">
                Esta ação não pode ser desfeita. O usuário será removido permanentemente.
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot tx-modal-foot">
          <b-button @click="showDeleteModal = false">Cancelar</b-button>
          <b-button type="is-danger" icon-left="delete" @click="confirmDelete">Excluir</b-button>
        </footer>
      </div>
    </b-modal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'

const ui = useUiStore()
onMounted(() => ui.setPageTitle('Tabelas'))

// ── Users table ────────────────────────────────────────────────
const search = ref('')
const perPageUsers = ref(10)
const currentPageUsers = ref(1)
const loading = ref(false)
const showUserModal = ref(false)
const showDeleteModal = ref(false)
const editingUser = ref<UserRow | null>(null)
const deletingUser = ref<UserRow | null>(null)
const checkedRows = ref<UserRow[]>([])

interface UserRow {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  date: string
  color: string
}

const avatarColors = ['#485fc7', '#48c774', '#3273dc', '#f59e0b', '#f14668', '#9b59b6', '#1abc9c', '#e67e22']

const names = ['João Silva', 'Maria Santos', 'Carlos Lima', 'Ana Costa', 'Pedro Oliveira', 'Lucia Fernandes', 'Roberto Alves', 'Fernanda Ramos', 'Thiago Souza', 'Camila Barbosa', 'Diego Martins', 'Beatriz Carvalho', 'Rodrigo Pereira', 'Juliana Rocha', 'Marcelo Gomes', 'Patricia Teixeira', 'Anderson Lima', 'Renata Moreira', 'Felipe Nascimento', 'Claudia Ribeiro']
const handles = ['joao', 'maria', 'carlos', 'ana', 'pedro', 'lucia', 'roberto', 'fernanda', 'thiago', 'camila', 'diego', 'beatriz', 'rodrigo', 'juliana', 'marcelo', 'patricia', 'anderson', 'renata', 'felipe', 'claudia']
const phones = ['(11) 98765-4321', '(21) 99876-5432', '(41) 97654-3210', '(31) 96543-2109', '(51) 95432-1098', '(71) 94321-0987', '(85) 93210-9876', '(92) 92109-8765', '(81) 91098-7654', '(11) 90987-6543', '(21) 89876-5432', '(41) 88765-4321', '(31) 87654-3210', '(51) 86543-2109', '(11) 85432-1098', '(21) 84321-0987', '(41) 83210-9876', '(31) 82109-8765', '(51) 81098-7654', '(11) 80987-6543']

const usersData = ref<UserRow[]>(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: names[i],
    email: handles[i] + '@empresa.com',
    phone: phones[i],
    role: ['Administrador', 'Gerente', 'Operador', 'Visualizador', 'Operador'][i % 5],
    status: i % 5 === 3 ? 'Inativo' : 'Ativo',
    date: `${String((i % 28) + 1).padStart(2, '0')}/${String((i % 12) + 1).padStart(2, '0')}/2025`,
    color: avatarColors[i % avatarColors.length],
  }))
)

const filteredUsers = computed(() => {
  if (!search.value) return usersData.value
  const q = search.value.toLowerCase()
  return usersData.value.filter(
    (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.role.toLowerCase().includes(q)
  )
})

const userForm = reactive({ name: '', email: '', phone: '', role: 'Operador', active: true })

function openAddModal() {
  editingUser.value = null
  Object.assign(userForm, { name: '', email: '', phone: '', role: 'Operador', active: true })
  showUserModal.value = true
}

function openEditModal(row: UserRow) {
  editingUser.value = row
  Object.assign(userForm, { name: row.name, email: row.email, phone: row.phone, role: row.role, active: row.status === 'Ativo' })
  showUserModal.value = true
}

function openDeleteModal(row: UserRow) {
  deletingUser.value = row
  showDeleteModal.value = true
}

function saveUser() {
  if (!userForm.name || !userForm.email) return
  if (editingUser.value) {
    editingUser.value.name = userForm.name
    editingUser.value.email = userForm.email
    editingUser.value.phone = userForm.phone
    editingUser.value.role = userForm.role
    editingUser.value.status = userForm.active ? 'Ativo' : 'Inativo'
    ui.notifySuccess('Usuário atualizado!')
  } else {
    usersData.value.push({
      id: usersData.value.length + 1,
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
      role: userForm.role,
      status: userForm.active ? 'Ativo' : 'Inativo',
      date: new Date().toLocaleDateString('pt-BR'),
      color: avatarColors[usersData.value.length % avatarColors.length],
    })
    ui.notifySuccess('Usuário criado!')
  }
  showUserModal.value = false
}

function confirmDelete() {
  if (!deletingUser.value) return
  const idx = usersData.value.findIndex((r) => r.id === deletingUser.value!.id)
  if (idx !== -1) usersData.value.splice(idx, 1)
  checkedRows.value = checkedRows.value.filter((r) => r.id !== deletingUser.value!.id)
  showDeleteModal.value = false
  ui.notifySuccess('Usuário excluído!')
}

function bulkDelete() {
  const ids = new Set(checkedRows.value.map((r) => r.id))
  usersData.value = usersData.value.filter((r) => !ids.has(r.id))
  const count = checkedRows.value.length
  checkedRows.value = []
  ui.notifySuccess(`${count} usuário${count > 1 ? 's' : ''} excluído${count > 1 ? 's' : ''}!`)
}

// ── Products table ─────────────────────────────────────────────
const productSearch = ref('')
const productCategory = ref('')

interface ProductRow {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
  active: boolean
  icon: string
  color: string
  description: string
  sku: string
  supplier: string
  weight: string
  createdAt: string
  sales: number
}

const productsData = ref<ProductRow[]>([
  { id: 1, name: 'Teclado Mecânico', category: 'Periférico', price: 459.90, stock: 23, rating: 5, active: true, icon: 'mdi-keyboard', color: '#485fc7', description: 'Teclado mecânico com switches Blue, retroiluminação RGB e layout ABNT2.', sku: 'TECL-MEC-001', supplier: 'TechBrasil', weight: '980g', createdAt: '10/01/2025', sales: 142 },
  { id: 2, name: 'Monitor 27" 4K', category: 'Hardware', price: 2199.90, stock: 8, rating: 5, active: true, icon: 'mdi-monitor', color: '#3273dc', description: 'Monitor IPS 4K com 144Hz, HDR400 e resposta de 1ms. Ideal para design e jogos.', sku: 'MON-27-4K-002', supplier: 'DisplayTech', weight: '5.2kg', createdAt: '15/01/2025', sales: 67 },
  { id: 3, name: 'Mouse Sem Fio', category: 'Periférico', price: 189.90, stock: 45, rating: 4, active: true, icon: 'mdi-mouse', color: '#48c774', description: 'Mouse wireless com DPI ajustável até 4800, bateria de 12 meses e receptor USB.', sku: 'MOUS-WL-003', supplier: 'TechBrasil', weight: '95g', createdAt: '20/01/2025', sales: 289 },
  { id: 4, name: 'SSD NVMe 1TB', category: 'Hardware', price: 399.90, stock: 0, rating: 5, active: false, icon: 'mdi-harddisk', color: '#f59e0b', description: 'SSD NVMe PCIe 4.0 com velocidade de leitura de 7000MB/s e escrita de 6500MB/s.', sku: 'SSD-NVMe-004', supplier: 'StoragePro', weight: '8g', createdAt: '25/01/2025', sales: 198 },
  { id: 5, name: 'Headset USB', category: 'Periférico', price: 299.90, stock: 15, rating: 4, active: true, icon: 'mdi-headset', color: '#9b59b6', description: 'Headset USB com microfone retrátil, drivers de 50mm e cancelamento de ruído passivo.', sku: 'HEAD-USB-005', supplier: 'AudioMax', weight: '320g', createdAt: '01/02/2025', sales: 94 },
  { id: 6, name: 'Suporte para Notebook', category: 'Acessório', price: 129.90, stock: 67, rating: 3, active: true, icon: 'mdi-laptop', color: '#1abc9c', description: 'Suporte ergonômico em alumínio para notebooks de 11 a 17 polegadas. Refrigeração passiva.', sku: 'SUP-NB-006', supplier: 'ErgoPro', weight: '650g', createdAt: '05/02/2025', sales: 213 },
  { id: 7, name: 'Licença Office 365', category: 'Software', price: 599.00, stock: 999, rating: 4, active: true, icon: 'mdi-microsoft-office', color: '#e67e22', description: 'Licença anual para 1 usuário com acesso a Word, Excel, PowerPoint, Teams e 1TB de OneDrive.', sku: 'OFF-365-007', supplier: 'Microsoft BR', weight: 'N/A', createdAt: '10/02/2025', sales: 445 },
  { id: 8, name: 'Webcam Full HD', category: 'Periférico', price: 249.90, stock: 5, rating: 4, active: true, icon: 'mdi-webcam', color: '#e74c3c', description: 'Webcam 1080p30fps com microfone estéreo embutido, autofoco e compatível com Windows/Mac/Linux.', sku: 'WEB-FHD-008', supplier: 'VideoTech', weight: '180g', createdAt: '15/02/2025', sales: 156 },
  { id: 9, name: 'Hub USB-C 7 em 1', category: 'Acessório', price: 179.90, stock: 32, rating: 5, active: true, icon: 'mdi-usb-port', color: '#2c3e50', description: 'Hub USB-C com HDMI 4K, 3x USB-A 3.0, SD/MicroSD, USB-C PD 87W. Alumínio escovado.', sku: 'HUB-7IN1-009', supplier: 'ConnectMax', weight: '72g', createdAt: '20/02/2025', sales: 327 },
  { id: 10, name: 'Mousepad XL', category: 'Acessório', price: 89.90, stock: 88, rating: 4, active: true, icon: 'mdi-surface-usb', color: '#27ae60', description: 'Mousepad extra large 900x400mm com base antiderrapante e bordas costuradas.', sku: 'MPAD-XL-010', supplier: 'GamerGear', weight: '450g', createdAt: '01/03/2025', sales: 512 },
])

const filteredProducts = computed(() => {
  return productsData.value.filter((p) => {
    const matchSearch = !productSearch.value || p.name.toLowerCase().includes(productSearch.value.toLowerCase())
    const matchCat = !productCategory.value || p.category === productCategory.value
    return matchSearch && matchCat
  })
})
</script>
