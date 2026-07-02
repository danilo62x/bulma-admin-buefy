<template>
  <div class="tx-login-page">
    <div class="tx-login-card">
      <!-- Header -->
      <div class="tx-login-header">
        <div class="tx-login-logo">
          <span class="mdi mdi-lock" />
        </div>
        <h1 class="title is-5 has-text-white mb-1">{{ t('auth.resetPassword') }}</h1>
        <p class="is-size-7" style="opacity: 0.8">Defina uma nova senha para sua conta.</p>
      </div>

      <!-- Body -->
      <div class="tx-login-body">
        <div v-if="!token" class="notification is-warning is-light has-text-centered is-size-7">
          Link inválido ou expirado. Solicite um novo link de redefinição.
        </div>

        <form @submit="onSubmit">
          <FormField
            name="password"
            label="Nova senha"
            type="password"
            placeholder="••••••••"
            icon="mdi-lock"
            hint="Use 8+ caracteres, com letras, números e símbolos"
          />

          <div v-if="password" class="mb-4">
            <div class="tx-strength-bars">
              <span
                v-for="i in 4"
                :key="i"
                class="tx-strength-bar"
                :class="i - 1 < score ? strength.color : ''"
              />
            </div>
            <p class="is-size-7 has-text-weight-medium" :class="strength.text">
              Força da senha: {{ strength.label }}
            </p>
          </div>

          <FormField
            name="confirmPassword"
            :label="t('auth.confirmPassword')"
            type="password"
            placeholder="••••••••"
            icon="mdi-lock-check"
          />

          <b-button
            native-type="submit"
            type="is-primary"
            expanded
            :loading="loading"
            class="mt-2"
          >
            {{ loading ? 'Salvando...' : t('auth.resetPassword') }}
          </b-button>
        </form>

        <p class="has-text-centered is-size-7 has-text-grey mt-5">
          <RouterLink to="/login" class="has-text-weight-medium">
            {{ t('common.back') }} — {{ t('auth.login') }}
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useFieldValue } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import FormField from '@/components/ui/FormField.vue'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const ui = useUiStore()
const loading = ref(false)

const token = (route.query.token as string) ?? ''

const STRENGTH = [
  { label: 'Muito fraca', color: 'is-danger', text: 'has-text-danger' },
  { label: 'Fraca', color: 'is-danger', text: 'has-text-danger' },
  { label: 'Razoável', color: 'is-warning', text: 'has-text-warning-dark' },
  { label: 'Boa', color: 'is-success', text: 'has-text-success' },
  { label: 'Forte', color: 'is-success', text: 'has-text-success' },
]

function passwordScore(pw: string): number {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

const schema = yup.object({
  password: yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirme sua senha'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { password: '', confirmPassword: '' },
})

const password = useFieldValue<string>('password')
const score = computed(() => passwordScore(password.value ?? ''))
const strength = computed(() => STRENGTH[score.value])

const onSubmit = handleSubmit(async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  // token would be sent to the backend together with the new password
  void token
  ui.notifySuccess('Senha redefinida com sucesso! Faça login com a nova senha.')
  router.push('/login')
})
</script>

<style scoped>
.tx-login-logo {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

.tx-strength-bars {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.35rem;
}

.tx-strength-bar {
  height: 6px;
  flex: 1;
  border-radius: 9999px;
  background: #dbdbdb;
  transition: background-color 0.2s;
}

.tx-strength-bar.is-danger {
  background: var(--bulma-danger, #f14668);
}
.tx-strength-bar.is-warning {
  background: var(--bulma-warning, #ffe08a);
}
.tx-strength-bar.is-success {
  background: var(--bulma-success, #48c78e);
}
</style>
