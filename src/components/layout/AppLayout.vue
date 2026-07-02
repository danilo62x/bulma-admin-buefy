<template>
  <div class="tx-layout">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Mobile backdrop -->
    <div
      class="tx-backdrop"
      :class="{ 'is-active': ui.sidebarMobileOpen }"
      @click="ui.toggleSidebarMobile(false)"
    />

    <!-- Main content -->
    <div
      class="tx-main"
      :class="{ 'sidebar-collapsed': ui.sidebarCollapsed }"
      :style="mainStyle"
    >
      <AppHeader />

      <main class="tx-content">
        <RouterView />
      </main>

      <FooterBar />
    </div>

    <!-- Toast notifications -->
    <div class="tx-notifications">
      <transition-group name="notif">
        <div
          v-for="notif in ui.notifications"
          :key="notif.id"
          class="tx-notification notification"
          :class="notif.type"
        >
          <button class="delete" @click="ui.dismissNotification(notif.id)" />
          {{ notif.message }}
        </div>
      </transition-group>
    </div>

    <!-- Cookie banner -->
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import FooterBar from './FooterBar.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'

const ui = useUiStore()
const route = useRoute()

const mainStyle = computed(() => {
  if (ui.sidebarCollapsed) return {}
  if (window.innerWidth <= 768) return {}
  return { marginLeft: `${ui.sidebarWidth}px` }
})

watch(
  () => route.meta.title,
  (title) => {
    if (title) ui.setPageTitle(title as string)
  },
  { immediate: true }
)
</script>

<style scoped>
.notif-enter-active,
.notif-leave-active {
  transition: all 0.25s ease;
}
.notif-enter-from,
.notif-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
