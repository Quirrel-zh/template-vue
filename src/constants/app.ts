/**
 * 应用配置常量
 */

// 语言相关
export const DEFAULT_LOCALE = 'zh-CN'
export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

// 存储键名常量
// LOCALE、THEME 和 USER_INFO 使用 localStorage，TOKEN 使用 sessionStorage
export const STORAGE_KEYS = {
  LOCALE: 'locale',
} as const
