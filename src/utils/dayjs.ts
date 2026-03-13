import type { SupportedLocale } from '@/constants/app'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

// 将 i18n locale 映射到 dayjs locale
const localeMap: Record<SupportedLocale, string> = {
  'zh-CN': 'zh-cn',
  'en-US': 'en',
}

// 设置 dayjs locale 的函数
export function setDayjsLocale(i18nLocale: SupportedLocale) {
  const dayjsLocale = localeMap[i18nLocale] || 'zh-cn'
  dayjs.locale(dayjsLocale)
}

/**
 * 智能相对时间格式化
 * 根据距离现在的时间长短显示不同的格式
 * @param date 日期字符串或 Date 对象
 * @returns 格式化后的时间字符串
 * - 5天内：显示相对时间（如 "23分钟前"、"2天前"）
 * - 超过5天但在本年内：显示月日（如 "12-3"）
 * - 不在本年：显示绝对日期（如 "2024-12-3"）
 */
export function formatRelativeTime(date: string | Date): string {
  const target = dayjs(date)
  const now = dayjs()
  const diffDays = now.diff(target, 'day')

  // 5天内，显示相对时间
  if (diffDays < 5) {
    return target.fromNow()
  }

  // 超过5天，判断是否在本年
  const currentYear = now.year()
  const targetYear = target.year()

  // 在本年内，显示月日
  if (currentYear === targetYear) {
    return target.format('MM-DD')
  }

  // 不在本年，显示绝对日期
  return target.format('YYYY-M-D')
}

export default dayjs
