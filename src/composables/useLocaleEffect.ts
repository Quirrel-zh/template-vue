import type { SupportedLocale } from '@/constants/app'
import { watch } from 'vue'
import i18n from '@/i18n'
import { useLocaleStore } from '@/stores/locale'
import { setDayjsLocale } from '@/utils/dayjs'

export function useLocaleEffect() {
  const store = useLocaleStore()

  watch(
    () => store.locale,
    (val) => {
      const locale = val as SupportedLocale
      i18n.global.locale.value = locale
      setDayjsLocale(locale)
    },
    { immediate: true },
  )
}
