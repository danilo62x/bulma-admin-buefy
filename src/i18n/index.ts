import { createI18n } from 'vue-i18n'

import ptBR from './locales/pt-BR.json'
import en from './locales/en.json'
import es from './locales/es.json'

export const LANGUAGES = [
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

const stored = localStorage.getItem('lang')
const browser = navigator.language
const initial = stored ?? (LANGUAGES.find((l) => l.code === browser)?.code ?? (browser.startsWith('pt') ? 'pt-BR' : 'pt-BR'))

const i18n = createI18n({
  legacy: false,
  locale: initial,
  fallbackLocale: 'pt-BR',
  messages: { 'pt-BR': ptBR, en, es },
})

export function setLanguage(code: LanguageCode) {
  i18n.global.locale.value = code
  localStorage.setItem('lang', code)
  document.documentElement.lang = code
}

export default i18n
