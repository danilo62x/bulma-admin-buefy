<template>
  <div class="tx-login-page">
    <div class="tx-login-card">
      <!-- Header -->
      <div class="tx-login-header">
        <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.8rem; font-weight: 900;">
          A
        </div>
        <h1 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.25rem;">Admin Template</h1>
        <p style="opacity: 0.8; font-size: 0.875rem;">Faça login para continuar</p>
      </div>

      <!-- Form -->
      <div class="tx-login-body">
        <form @submit.prevent="handleLogin">
          <b-field
            label="E-mail"
            :type="errors.email ? 'is-danger' : ''"
            :message="errors.email"
          >
            <b-input
              v-model="form.email"
              type="email"
              placeholder="seu@email.com"
              icon="email"
              expanded
            />
          </b-field>

          <b-field
            label="Senha"
            :type="errors.password ? 'is-danger' : errors.global ? 'is-danger' : ''"
            :message="errors.password || errors.global"
          >
            <b-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              icon="lock"
              :icon-right="showPassword ? 'eye-off' : 'eye'"
              icon-right-clickable
              expanded
              @icon-right-click="showPassword = !showPassword"
            />
          </b-field>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <b-checkbox v-model="form.remember" size="is-small">
              Lembrar-me
            </b-checkbox>
            <RouterLink to="/forgot-password" style="font-size: 0.8rem; color: var(--tx-primary);">Esqueceu a senha?</RouterLink>
          </div>

          <b-button
            native-type="submit"
            type="is-primary"
            expanded
            :loading="loading"
          >
            Entrar
          </b-button>
        </form>

        <div style="margin-top: 1.5rem; padding: 0.75rem; background: #f0f4ff; border-radius: 6px; font-size: 0.78rem; color: #555;">
          <strong>Credenciais de demonstração:</strong><br />
          admin@template.com / admin123<br />
          user@template.com / user123
        </div>

        <p style="margin-top: 1.25rem; text-align: center; font-size: 0.85rem; color: var(--tx-text-muted);">
          Ainda não tem conta?
          <RouterLink to="/register" style="color: var(--tx-primary); font-weight: 600;">Criar conta</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive({ email: '', password: '', global: '' })
const loading = ref(false)
const showPassword = ref(false)

function validate(): boolean {
  errors.email = ''
  errors.password = ''
  errors.global = ''
  if (!form.email) errors.email = 'E-mail é obrigatório'
  if (!form.password) errors.password = 'Senha é obrigatória'
  return !errors.email && !errors.password
}

async function handleLogin() {
  if (!validate()) return
  loading.value = true
  try {
    const ok = await auth.login(form.email, form.password)
    if (!ok) {
      errors.global = 'E-mail ou senha inválidos'
      return
    }
    const redirect = (route.query.redirect as string) ?? '/dashboard'
    router.push(redirect)
  } finally {
    loading.value = false
  }
}
</script>
