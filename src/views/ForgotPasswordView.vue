<template>
  <div class="tx-login-page">
    <div class="tx-login-card">
      <!-- Header -->
      <div class="tx-login-header">
        <div class="tx-login-logo">
          <span class="mdi mdi-lock" />
        </div>
        <h1 class="title is-5 has-text-white mb-1">{{ t('auth.forgotPassword') }}</h1>
        <p class="is-size-7" style="opacity: 0.8">
          Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <!-- Body -->
      <div class="tx-login-body">
        <div v-if="sentTo" class="has-text-centered">
          <span class="icon is-large has-text-success">
            <span class="mdi mdi-check-circle mdi-48px" />
          </span>
          <h2 class="title is-6 mt-3">Link enviado para seu e-mail</h2>
          <p class="is-size-7 has-text-grey">
            Enviamos um link de redefinição para
            <span class="has-text-weight-medium has-text-dark">{{ sentTo }}</span>. Verifique sua
            caixa de entrada e o spam.
          </p>
          <div class="notification is-light mt-4 is-size-7">
            Não recebeu?
            <a class="has-text-weight-medium" @click="sentTo = null">Tentar outro e-mail</a>
          </div>
        </div>

        <form v-else @submit="onSubmit">
          <FormField
            name="email"
            :label="t('auth.email')"
            type="email"
            placeholder="seu@email.com"
            icon="mdi-email"
          />
          <b-button
            native-type="submit"
            type="is-primary"
            expanded
            :loading="loading"
            class="mt-2"
          >
            {{ loading ? 'Enviando...' : t('auth.sendResetLink') }}
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
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import FormField from '@/components/ui/FormField.vue'

const { t } = useI18n()
const loading = ref(false)
const sentTo = ref<string | null>(null)

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('Informe seu e-mail'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: { email: '' },
})

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  sentTo.value = values.email
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
</style>
