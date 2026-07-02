<template>
  <div class="tx-datatable">
    <div v-if="searchable" class="field" style="max-width: 320px; margin-bottom: 1rem;">
      <div class="control has-icons-left">
        <input
          v-model="globalFilter"
          class="input"
          type="text"
          :placeholder="t('common.search')"
        />
        <span class="icon is-left"><i class="mdi mdi-magnify" /></span>
      </div>
    </div>

    <div class="table-container">
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr v-for="hg in table.getHeaderGroups()" :key="hg.id">
            <th v-for="header in hg.headers" :key="header.id" :style="header.column.getCanSort() ? 'cursor:pointer;user-select:none;' : ''">
              <span @click="header.column.getToggleSortingHandler()?.($event)">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                <span v-if="header.column.getIsSorted() === 'asc'" class="mdi mdi-arrow-up" />
                <span v-else-if="header.column.getIsSorted() === 'desc'" class="mdi mdi-arrow-down" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="table.getRowModel().rows.length === 0">
            <td :colspan="columns.length" class="has-text-centered has-text-grey" style="padding: 2.5rem;">
              {{ t('common.noResults') }}
            </td>
          </tr>
          <tr v-for="row in table.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="level is-mobile" style="margin-top: 1rem;">
      <div class="level-left">
        <span class="is-size-7 has-text-grey">
          {{ table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 }}–{{
            Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )
          }}
          / {{ table.getFilteredRowModel().rows.length }}
        </span>
      </div>
      <div class="level-right">
        <div class="buttons has-addons">
          <button class="button is-small" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
            {{ t('common.previous') }}
          </button>
          <button class="button is-small" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
            {{ t('common.next') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<T, any>[]
    data: T[]
    pageSize?: number
    searchable?: boolean
  }>(),
  { pageSize: 10, searchable: true }
)

const { t } = useI18n()
const sorting = ref<SortingState>([])
const globalFilter = ref('')

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onGlobalFilterChange: (updater) => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: { pagination: { pageSize: props.pageSize } },
})
</script>
