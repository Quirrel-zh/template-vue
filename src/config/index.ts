/**
 * 集中管理环境变量与全局配置
 */

const env = import.meta.env

export const Config = {
  // 基础请求地址，设置默认值防止 undefined
  baseURL: env.VITE_API_BASE_URL || '/api',

  // 当前环境状态
  isDev: env.DEV,
  isProd: env.PROD,

  // 其他全局配置
  title: env.VITE_APP_TITLE || 'OA-Admin',
} as const // 只读
