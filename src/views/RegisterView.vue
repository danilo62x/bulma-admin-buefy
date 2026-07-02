<template>
  <div class="tx-login-page">
    <div class="tx-login-card">
      <!-- Header -->
      <div class="tx-login-header">
        <div class="tx-login-logo">A</div>
        <h1 class="title is-5 has-text-white mb-1">{{ t('auth.register') }}</h1>
        <p class="is-size-7" style="opacity: 0.8">Preencha os dados para começar</p>
      </div>

      <!-- Form -->
      <div class="tx-login-body">
        <form @submit="onSubmit">
          <FormField
            name="name"
            :label="t('auth.name')"
            type="text"
            placeholder="Seu nome completo"
            icon="mdi-account"
          />
          <FormField
            name="email"
            :label="t('auth.email')"
            type="email"
            placeholder="seu@email.com"
            icon="mdi-email"
          />
          <FormField
            name="password"
            :label="t('auth.password')"
            type="password"
            placeholder="••••••••"
            icon="mdi-lock"
            hint="Mínimo de 8 caracteres"
          />
          <FormField
            name="confirmPassword"
            :label="t('auth.confirmPassword')"
            type="password"
            placeholder="••••••••"
            icon="mdi-lock-check"
          />

          <FormField
            name="acceptTerms"
            as="checkbox"
            label="Li e aceito os termos de uso e a política de privacidade"
          />

          <b-button
            native-type="submit"
            type="is-primary"
            expanded
            :loading="loading"
            class="mt-4"
          >
            {{ loading ? 'Criando conta...' : t('auth.register') }}
          </b-button>
        </form>

        <p class="has-text-centered is-size-7 has-text-grey mt-5">
          {{ t('auth.alreadyHaveAccount') }}
          <RouterLink to="/login" class="has-text-weight-medium">
            {{ t('auth.login') }}
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import FormField from '@/components/ui/FormField.vue'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const router = useRouter()
const ui = useUiStore()
const loading = ref(false)

const schema = yup.object({
  name: yup.string().trim().required('Informe seu nome'),
  email: yup.string().email('E-mail inválido').required('Informe seu e-mail'),
  password: yup.string().min(8, 'A senha deve ter ao menos 8 caracteres').required('Informe uma senha'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirme sua senha'),
  acceptTerms: yup.boolean().oneOf([true], 'Você precisa aceitar os termos'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  },
})

const onSubmit = handleSubmit(async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  ui.notifySuccess('Conta criada com sucesso! Faça login para continuar.')
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
  font-weight: 900;
}
</style>
