<template>
  <div class="integrations">
    <!-- a) ApexCharts -->
    <div class="tx-section-head">
      <h2 class="title is-5" style="margin: 0;">Gráficos</h2>
      <span class="tag is-primary is-light"><span class="icon is-small"><i class="mdi mdi-flash" /></span><span>ApexCharts</span></span>
      <p class="tx-section-desc">Gráficos interativos e responsivos com tema claro/escuro automático.</p>
    </div>

    <CardComponent title="Receita x Despesas" icon="mdi-chart-areaspline">
      <ApexChart type="area" :series="areaSeries" :options="areaOptions" :height="320" />
    </CardComponent>

    <div class="columns" style="margin-top: 1rem;">
      <div class="column is-7">
        <CardComponent title="Vendas por produto" icon="mdi-chart-bar">
          <ApexChart type="bar" :series="barSeries" :options="barOptions" :height="300" />
        </CardComponent>
      </div>
      <div class="column is-5">
        <CardComponent title="Fontes de tráfego" icon="mdi-chart-donut">
          <ApexChart type="donut" :series="donutSeries" :options="donutOptions" :height="300" />
        </CardComponent>
      </div>
    </div>

    <!-- b) DataTable -->
    <div class="tx-section-head" style="margin-top: 2rem;">
      <h2 class="title is-5" style="margin: 0;">Tabela de dados</h2>
      <span class="tag is-primary is-light"><span class="icon is-small"><i class="mdi mdi-flash" /></span><span>TanStack Table</span></span>
      <p class="tx-section-desc">Ordenação, busca global e paginação no cliente.</p>
    </div>

    <CardComponent title="Usuários" icon="mdi-account-group">
      <DataTable :columns="userColumns" :data="users" :page-size="5" :searchable="true" />
    </CardComponent>

    <!-- c) vee-validate + yup  /  d) RichTextEditor -->
    <div class="columns" style="margin-top: 2rem;">
      <div class="column is-6">
        <div class="tx-section-head">
          <h2 class="title is-5" style="margin: 0;">Formulário validado</h2>
          <span class="tag is-primary is-light"><span class="icon is-small"><i class="mdi mdi-flash" /></span><span>vee-validate + yup</span></span>
        </div>
        <CardComponent title="Cadastro" icon="mdi-form-select">
          <form @submit="onSubmit">
            <FormField name="nome" label="Nome completo" placeholder="Seu nome" icon="account" />
            <FormField name="email" label="E-mail" type="email" placeholder="voce@empresa.com" icon="email" />
            <FormField name="plano" label="Plano" as="select">
              <option value="">Selecione...</option>
              <option value="start">Start</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </FormField>
            <FormField name="termos" as="checkbox" label="Aceito os termos de uso" />
            <button type="submit" class="button is-primary" style="margin-top: 0.5rem;">
              <span class="icon"><i class="mdi mdi-check" /></span>
              <span>Enviar</span>
            </button>
          </form>
        </CardComponent>
      </div>

      <div class="column is-6">
        <div class="tx-section-head">
          <h2 class="title is-5" style="margin: 0;">Editor de texto rico</h2>
          <span class="tag is-primary is-light"><span class="icon is-small"><i class="mdi mdi-flash" /></span><span>Tiptap</span></span>
        </div>
        <CardComponent title="Conteúdo" icon="mdi-format-text">
          <RichTextEditor v-model="content" placeholder="Comece a escrever o seu conteúdo aqui..." />
        </CardComponent>
      </div>
    </div>

    <!-- e) DatePicker  /  f) FileDropzone -->
    <div class="columns" style="margin-top: 2rem;">
      <div class="column is-6">
        <div class="tx-section-head">
          <h2 class="title is-5" style="margin: 0;">Seletor de data</h2>
          <span class="tag is-primary is-light"><span class="icon is-small"><i class="mdi mdi-flash" /></span><span>b-datepicker</span></span>
        </div>
        <CardComponent title="Datas" icon="mdi-calendar">
          <DatePicker v-model="d1" label="Data" placeholder="Selecione a data" />
          <DatePicker v-model="d2" label="Data e hora" :show-time="true" placeholder="Selecione data e hora" />
        </CardComponent>
      </div>

      <div class="column is-6">
        <div class="tx-section-head">
          <h2 class="title is-5" style="margin: 0;">Upload de arquivos</h2>
          <span class="tag is-primary is-light"><span class="icon is-small"><i class="mdi mdi-flash" /></span><span>Dropzone</span></span>
        </div>
        <CardComponent title="Enviar arquivos" icon="mdi-cloud-upload">
          <FileDropzone :max-files="5" accept="image/*,application/pdf" @files="onFiles" />
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import type { ColumnDef } from '@tanstack/vue-table'
import { useUiStore } from '@/stores/ui'
import CardComponent from '@/components/ui/CardComponent.vue'
import ApexChart from '@/components/ui/ApexChart.vue'
import DataTable from '@/components/ui/DataTable.vue'
import FormField from '@/components/ui/FormField.vue'
import RichTextEditor from '@/components/ui/RichTextEditor.vue'
import DatePicker from '@/components/ui/DatePicker.vue'
import FileDropzone from '@/components/ui/FileDropzone.vue'

const ui = useUiStore()
onMounted(() => useUiStore().setPageTitle('Integrações & Bibliotecas'))

/* ── a) ApexCharts ─────────────────────────────────────────── */
const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const areaSeries = ref<ApexOptions['series']>([
  { name: 'Receita', data: [31, 40, 28, 51, 42, 62, 58, 70, 65, 82, 78, 95] },
  { name: 'Despesas', data: [22, 28, 25, 33, 30, 38, 36, 44, 41, 50, 47, 55] },
])
const areaOptions = computed<ApexOptions>(() => ({
  chart: { type: 'area' },
  xaxis: { categories: MONTHS },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
  legend: { show: true, position: 'top' },
}))

const barSeries = ref<ApexOptions['series']>([{ name: 'Vendas', data: [44, 55, 41, 67, 22, 43, 36, 52] }])
const barOptions = computed<ApexOptions>(() => ({
  chart: { type: 'bar' },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
  xaxis: { categories: ['Pro', 'Start', 'Storage', 'Ent.', 'Treino', 'API', 'SMS', 'Extra'] },
}))

const donutSeries = ref<ApexOptions['series']>([42, 24, 18, 10, 6])
const donutOptions = computed<ApexOptions>(() => ({
  chart: { type: 'donut' },
  labels: ['Google', 'Direto', 'Social', 'Email', 'Outros'],
  legend: { show: true, position: 'bottom' },
  plotOptions: { pie: { donut: { size: '65%' } } },
}))

/* ── b) DataTable ──────────────────────────────────────────── */
interface UserRow {
  id: number
  nome: string
  email: string
  funcao: string
  status: 'Ativo' | 'Pendente' | 'Inativo'
  valor: number
}

const users = ref<UserRow[]>([
  { id: 1, nome: 'Marina Costa', email: 'marina@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 1299.9 },
  { id: 2, nome: 'Lucas Pereira', email: 'lucas@empresa.com', funcao: 'Editor', status: 'Pendente', valor: 349.5 },
  { id: 3, nome: 'Aline Souza', email: 'aline@empresa.com', funcao: 'Visualizador', status: 'Ativo', valor: 89.0 },
  { id: 4, nome: 'Rafael Lima', email: 'rafael@empresa.com', funcao: 'Editor', status: 'Inativo', valor: 0 },
  { id: 5, nome: 'Bianca Rocha', email: 'bianca@empresa.com', funcao: 'Administradora', status: 'Ativo', valor: 2499.0 },
  { id: 6, nome: 'Diego Martins', email: 'diego@empresa.com', funcao: 'Visualizador', status: 'Pendente', valor: 159.9 },
])

function statusTagClass(status: UserRow['status']) {
  if (status === 'Ativo') return 'tag is-success is-light'
  if (status === 'Pendente') return 'tag is-warning is-light'
  return 'tag is-danger is-light'
}

const currencyFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const userColumns: ColumnDef<UserRow, any>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: (info) => h('span', { class: 'has-text-weight-medium' }, info.getValue() as string),
  },
  { accessorKey: 'email', header: 'E-mail' },
  { accessorKey: 'funcao', header: 'Função' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as UserRow['status']
      return h('span', { class: statusTagClass(status) }, status)
    },
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: (info) =>
      h('span', { class: 'has-text-weight-medium' }, currencyFmt.format(info.getValue() as number)),
  },
]

/* ── c) vee-validate + yup ─────────────────────────────────── */
const schema = yup.object({
  nome: yup.string().min(3, 'Mínimo de 3 caracteres').required('Informe o nome'),
  email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
  plano: yup.string().required('Selecione um plano'),
  termos: yup.boolean().oneOf([true], 'É preciso aceitar os termos').required(),
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { nome: '', email: '', plano: '', termos: false },
})

const onSubmit = handleSubmit((values) => {
  ui.notifySuccess(`Formulário enviado com sucesso para ${values.nome}!`)
  resetForm()
})

/* ── d) RichTextEditor ─────────────────────────────────────── */
const content = ref('<p>Edite este <strong>conteúdo</strong> com a barra de ferramentas acima.</p>')

/* ── e) DatePicker ─────────────────────────────────────────── */
const d1 = ref<Date | null>(new Date())
const d2 = ref<Date | null>(new Date())

/* ── f) FileDropzone ───────────────────────────────────────── */
function onFiles(files: File[]) {
  if (files.length) ui.notifySuccess(`${files.length} arquivo(s) selecionado(s).`)
}
</script>

<style scoped>
.tx-section-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.tx-section-desc {
  font-size: 0.875rem;
  color: var(--tx-text-muted);
  margin: 0;
}
</style>
