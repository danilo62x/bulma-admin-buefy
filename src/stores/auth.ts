import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
}

const MOCK_USERS = [
  { id: 1, email: 'admin@template.com', password: 'admin123', name: 'Admin Usuário', role: 'Administrador' },
  { id: 2, email: 'user@template.com', password: 'user123', name: 'Usuário Comum', role: 'Operador' },
]

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)

    const isAuthenticated = computed(() => user.value !== null)

    async function login(email: string, password: string): Promise<boolean> {
      await new Promise((r) => setTimeout(r, 600))
      const found = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      )
      if (!found) return false

      user.value = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
      }
      return true
    }

    function logout() {
      user.value = null
    }

    return {
      user,
      isAuthenticated,
      login,
      logout,
    }
  },
  {
    persist: {
      pick: ['user'],
    },
  }
)
