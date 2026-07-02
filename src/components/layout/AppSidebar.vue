<template>
  <aside
    class="tx-sidebar"
    :class="{
      'is-collapsed': ui.sidebarCollapsed,
      'is-mobile-open': ui.sidebarMobileOpen,
    }"
    :style="sidebarStyle"
  >
    <!-- Brand -->
    <div class="tx-sidebar-brand">
      <div class="tx-sidebar-icon-box">A</div>
      <span class="tx-sidebar-brand-text">Admin Template</span>
    </div>

    <!-- Navigation -->
    <nav class="tx-sidebar-nav">
      <template v-for="item in menu.items" :key="item.label">
        <!-- Item with children (level 1 parent) -->
        <template v-if="item.children?.length">
          <div
            class="tx-nav-item"
            :class="{ 'is-active': isGroupActive(item) }"
            @click="toggleGroup(item.label)"
          >
            <span class="tx-nav-icon mdi" :class="item.icon" />
            <span class="tx-nav-label">{{ item.label }}</span>
            <span
              class="tx-nav-chevron mdi mdi-chevron-down"
              :class="{ 'is-open': openGroups.has(item.label) }"
            />
          </div>
          <div
            class="tx-nav-submenu"
            :class="{ 'is-open': openGroups.has(item.label) && !ui.sidebarCollapsed }"
          >
            <template v-for="child in item.children" :key="child.label">
              <!-- Level 2 parent (has grandchildren) -->
              <template v-if="child.children?.length">
                <div
                  class="tx-nav-subgroup"
                  :class="{ 'is-active': isGroupActive(child) }"
                  @click.stop="toggleGroup(child.label)"
                >
                  <span class="mdi" :class="child.icon" style="font-size: 1rem;" />
                  {{ child.label }}
                  <span
                    class="tx-nav-subgroup-chevron mdi mdi-chevron-down"
                    :class="{ 'is-open': openGroups.has(child.label) }"
                  />
                </div>
                <div
                  class="tx-nav-subsubmenu"
                  :class="{ 'is-open': openGroups.has(child.label) }"
                >
                  <RouterLink
                    v-for="grandchild in child.children"
                    :key="grandchild.label"
                    :to="grandchild.href ?? '#'"
                    class="tx-nav-subsubitem"
                    :class="{ 'is-active': isActive(grandchild.href) }"
                    @click="onNavClick"
                  >
                    <span class="mdi" :class="grandchild.icon" style="margin-right: 0.4rem; font-size: 0.9rem;" />
                    {{ grandchild.label }}
                  </RouterLink>
                </div>
              </template>

              <!-- Level 2 leaf link -->
              <RouterLink
                v-else
                :to="child.href ?? '#'"
                class="tx-nav-subitem"
                :class="{ 'is-active': isActive(child.href) }"
                @click="onNavClick"
              >
                <span class="mdi" :class="child.icon" style="margin-right: 0.5rem; font-size: 1rem;" />
                {{ child.label }}
              </RouterLink>
            </template>
          </div>
        </template>

        <!-- Level 1 leaf link -->
        <RouterLink
          v-else
          :to="item.href ?? '#'"
          class="tx-nav-item"
          :class="{ 'is-active': isActive(item.href) }"
          @click="onNavClick"
        >
          <span class="tx-nav-icon mdi" :class="item.icon" />
          <span class="tx-nav-label">{{ item.label }}</span>
        </RouterLink>
      </template>
    </nav>

    <!-- Footer actions -->
    <div class="tx-sidebar-footer">
      <div
        v-for="item in menu.footerItems"
        :key="item.label"
        class="tx-nav-item"
        @click="handleFooterAction(item)"
      >
        <span class="tx-nav-icon mdi" :class="item.icon" />
        <span class="tx-nav-label">{{ item.label }}</span>
      </div>
    </div>

    <!-- Resize handle -->
    <div
      v-if="!ui.sidebarCollapsed"
      class="tx-resize-handle"
      :class="{ 'is-resizing': isResizing }"
      @mousedown="startResize"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useMenuStore } from '@/stores/menu'
import type { MenuItem } from '@/stores/menu'

const ui = useUiStore()
const auth = useAuthStore()
const menu = useMenuStore()
const route = useRoute()
const router = useRouter()

const openGroups = ref<Set<string>>(new Set())
const isResizing = ref(false)

const sidebarStyle = computed(() => {
  if (ui.sidebarCollapsed) return {}
  return { width: `${ui.sidebarWidth}px`, minWidth: `${ui.sidebarWidth}px` }
})

function isActive(href?: string) {
  if (!href) return false
  return route.path === href || route.path.startsWith(href + '/')
}

function isGroupActive(item: MenuItem): boolean {
  if (!item.children) return false
  return item.children.some((c) => {
    if (c.children?.length) return isGroupActive(c)
    return isActive(c.href)
  })
}

function toggleGroup(label: string) {
  if (openGroups.value.has(label)) {
    openGroups.value.delete(label)
  } else {
    openGroups.value.add(label)
  }
}

function onNavClick() {
  if (window.innerWidth <= 768) {
    ui.toggleSidebarMobile(false)
  }
}

function handleFooterAction(item: MenuItem) {
  if (item.action === 'logout') {
    auth.logout()
    router.push('/login')
  } else if (item.href) {
    router.push(item.href)
    onNavClick()
  }
}

function startResize(e: MouseEvent) {
  isResizing.value = true
  const startX = e.clientX
  const startWidth = ui.sidebarWidth

  function onMove(e: MouseEvent) {
    ui.setSidebarWidth(startWidth + (e.clientX - startX))
  }

  function onUp() {
    isResizing.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

function autoOpenActiveGroups(items: MenuItem[]) {
  items.forEach((item) => {
    if (item.children?.length) {
      const hasActive = item.children.some((c) => {
        if (c.children?.length) return c.children.some((g) => isActive(g.href))
        return isActive(c.href)
      })
      if (hasActive) openGroups.value.add(item.label)
      // recurse for level 2 parents
      item.children.forEach((child) => {
        if (child.children?.length) {
          const childHasActive = child.children.some((g) => isActive(g.href))
          if (childHasActive) openGroups.value.add(child.label)
        }
      })
    }
  })
}

onMounted(() => {
  autoOpenActiveGroups(menu.items)
})
</script>
