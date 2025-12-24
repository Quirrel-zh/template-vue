/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line ts/no-empty-object-type
  const component: DefineComponent<{}, {}, any>
  export default component
}

// unplugin-vue-components 自动导入类型声明
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Ant Design Vue 组件会自动注册，这里提供类型提示
    [key: string]: any
  }
}

// 确保 Vue 类型正确导出
export {}
