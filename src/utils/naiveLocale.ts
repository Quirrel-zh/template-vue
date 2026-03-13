import type { SupportedLocale } from '@/constants/app'
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

interface NaiveLocaleConfig {
  locale: typeof zhCN
  dateLocale: typeof dateZhCN
}

/** i18n locale 到 Naive UI locale 的映射 */
const naiveLocaleMap = {
  'zh-CN': {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
  'en-US': {
    locale: enUS,
    dateLocale: dateEnUS,
  },
} satisfies Record<SupportedLocale, NaiveLocaleConfig>

/**
 * 根据 i18n locale 获取对应的 Naive UI locale
 */
export function getNaiveLocale(locale: SupportedLocale): NaiveLocaleConfig {
  return naiveLocaleMap[locale] ?? naiveLocaleMap['zh-CN']
}
