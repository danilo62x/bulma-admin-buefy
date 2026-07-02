import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public / standalone (blank layout)
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPasswordView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/ResetPasswordView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component: () => import('@/views/MaintenanceView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
    {
      path: '/coming-soon',
      name: 'coming-soon',
      component: () => import('@/views/ComingSoonView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },

    // Authenticated admin
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true, title: 'Dashboard' },
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import('@/views/ChartsView.vue'),
      meta: { requiresAuth: true, title: 'Gráficos & Analytics' },
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('@/views/FormsView.vue'),
      meta: { requiresAuth: true, title: 'Formulários' },
    },
    {
      path: '/tables',
      name: 'tables',
      component: () => import('@/views/TablesView.vue'),
      meta: { requiresAuth: true, title: 'Tabelas' },
    },
    {
      path: '/components/:section?',
      name: 'components',
      component: () => import('@/views/ComponentsView.vue'),
      meta: { requiresAuth: true, title: 'Componentes' },
    },
    {
      path: '/ui-advanced',
      name: 'ui-advanced',
      component: () => import('@/views/UiAdvancedView.vue'),
      meta: { requiresAuth: true, title: 'Componentes avançados' },
    },
    {
      path: '/typography',
      name: 'typography',
      component: () => import('@/views/TypographyView.vue'),
      meta: { requiresAuth: true, title: 'Tipografia' },
    },
    {
      path: '/integrations',
      name: 'integrations',
      component: () => import('@/views/IntegrationsView.vue'),
      meta: { requiresAuth: true, title: 'Integrações & Bibliotecas' },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/PricingView.vue'),
      meta: { requiresAuth: true, title: 'Planos & Preços' },
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('@/views/InboxView.vue'),
      meta: { requiresAuth: true, title: 'Caixa de entrada' },
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('@/views/FileManagerView.vue'),
      meta: { requiresAuth: true, title: 'Arquivos' },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
      meta: { requiresAuth: true, title: 'Galeria' },
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('@/views/InvoiceView.vue'),
      meta: { requiresAuth: true, title: 'Fatura' },
    },
    {
      path: '/billing',
      name: 'billing',
      component: () => import('@/views/BillingView.vue'),
      meta: { requiresAuth: true, title: 'Cobrança' },
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('@/views/DocumentationView.vue'),
      meta: { requiresAuth: true, title: 'Documentação' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true, title: 'Meu Perfil' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { requiresAuth: true, title: 'Configurações' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { layout: 'blank', requiresAuth: false },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.name === 'login' && auth.isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
