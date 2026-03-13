/// <reference types="vite/client" />

// 环境变量类型定义
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_APP_TITLE: string
    readonly VITE_PROXY_TARGET?: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line ts/no-empty-object-type
  const component: DefineComponent<{}, {}, any>
  export default component
}

// unplugin-vue-components 自动导入类型声明
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Naive UI 组件会自动注册，这里提供类型提示
    [key: string]: any
  }
}

// 确保 Vue 类型正确导出
export {}
