import type { SupportedLocale } from '@/constants/app'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_LOCALE, STORAGE_KEYS } from '@/constants/app'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref(localStorage.getItem(STORAGE_KEYS.LOCALE) || DEFAULT_LOCALE)

  function setLocale(val: SupportedLocale) {
    locale.value = val
    localStorage.setItem(STORAGE_KEYS.LOCALE, val)
  }

  return { locale, setLocale }
})
