import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, STORAGE_KEYS } from './constants/app'
import enUS from './locales/en-US'
import zhCN from './locales/zh-CN'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: localStorage.getItem(STORAGE_KEYS.LOCALE) || DEFAULT_LOCALE,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n
