import type { SupportedLocale } from '@/constants/app'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'

export function useLanguageSwitch() {
  const localeStore = useLocaleStore()
  const { locale } = useI18n()

  const currentLocale = computed(() => localeStore.locale)

  const setLocale = (lang: SupportedLocale) => {
    localeStore.setLocale(lang)
    locale.value = lang
  }

  return {
    currentLocale,
    setLocale,
  }
}
