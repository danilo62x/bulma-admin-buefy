import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Notification {
  id: number
  message: string
  type: 'is-success' | 'is-danger' | 'is-warning' | 'is-info'
  duration: number
}

let notifId = 0

export const useUiStore = defineStore(
  'ui',
  () => {
    const darkMode = ref(false)
    const sidebarCollapsed = ref(false)
    const sidebarWidth = ref(260)
    const sidebarMobileOpen = ref(false)
    const pageTitle = ref('Dashboard')
    const notifications = ref<Notification[]>([])

    const isLoading = ref(false)
    const customTheme = ref<Record<string, string>>({})

    const cookiesAccepted = ref(false)
    const showCookieBanner = ref(false)

    function acceptCookies() {
      cookiesAccepted.value = true
      showCookieBanner.value = false
    }

    function declineCookies() {
      cookiesAccepted.value = false
      showCookieBanner.value = false
    }

    function openCookieBanner() {
      showCookieBanner.value = true
    }

    function closeCookieBanner() {
      showCookieBanner.value = false
    }

    function toggleDarkMode() {
      darkMode.value = !darkMode.value
      applyTheme()
    }

    function setDarkMode(val: boolean) {
      darkMode.value = val
      applyTheme()
    }

    function applyTheme() {
      document.documentElement.setAttribute(
        'data-theme',
        darkMode.value ? 'dark' : 'light'
      )
      Object.entries(customTheme.value).forEach(([key, val]) => {
        document.documentElement.style.setProperty(key, val)
      })
    }

    function setThemeVar(key: string, val: string) {
      customTheme.value[key] = val
      document.documentElement.style.setProperty(key, val)
    }

    function resetThemeVars() {
      Object.keys(customTheme.value).forEach((key) => {
        document.documentElement.style.removeProperty(key)
      })
      customTheme.value = {}
    }

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    function setSidebarWidth(w: number) {
      sidebarWidth.value = Math.min(400, Math.max(160, w))
    }

    function toggleSidebarMobile(val?: boolean) {
      sidebarMobileOpen.value = val !== undefined ? val : !sidebarMobileOpen.value
    }

    function setPageTitle(title: string) {
      pageTitle.value = title
      document.title = title ? `${title} — Admin Template` : 'Admin Template'
    }

    function notify(message: string, type: Notification['type'] = 'is-info', duration = 4000) {
      const id = ++notifId
      notifications.value.push({ id, message, type, duration })
      setTimeout(() => dismissNotification(id), duration)
    }

    function notifySuccess(message: string) {
      notify(message, 'is-success')
    }

    function notifyError(message: string) {
      notify(message, 'is-danger')
    }

    function notifyWarning(message: string) {
      notify(message, 'is-warning')
    }

    function dismissNotification(id: number) {
      const idx = notifications.value.findIndex((n) => n.id === id)
      if (idx !== -1) notifications.value.splice(idx, 1)
    }

    const sidebarStyle = computed(() => ({
      width: sidebarCollapsed.value
        ? `var(--tx-sidebar-collapsed)`
        : `${sidebarWidth.value}px`,
    }))

    return {
      darkMode,
      sidebarCollapsed,
      sidebarWidth,
      sidebarMobileOpen,
      pageTitle,
      notifications,
      isLoading,
      customTheme,
      toggleDarkMode,
      setDarkMode,
      applyTheme,
      setThemeVar,
      resetThemeVars,
      toggleSidebar,
      setSidebarWidth,
      toggleSidebarMobile,
      setPageTitle,
      notify,
      notifySuccess,
      notifyError,
      notifyWarning,
      dismissNotification,
      sidebarStyle,
      cookiesAccepted,
      showCookieBanner,
      acceptCookies,
      declineCookies,
      openCookieBanner,
      closeCookieBanner,
    }
  },
  {
    persist: {
      pick: ['darkMode', 'sidebarCollapsed', 'sidebarWidth', 'customTheme', 'cookiesAccepted'],
    },
  }
)
