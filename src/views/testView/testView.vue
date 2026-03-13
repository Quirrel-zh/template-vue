<script setup>
  import { useRouter } from 'vue-router'
  import LanguageSwitch from '@/components/common/LanguageSwitch/index.vue'
  import { usePage } from './testView'

  const router = useRouter()
  const { searchValue, columns, filteredTableData, rowKey, handleSearch, handleReset, handleAdd } =
    usePage()

  const handleGoBack = () => {
    router.push('/')
  }
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-7xl p-6 md:p-8 space-y-6">
      <section class="flex flex-wrap items-start justify-between gap-4">
        <div class="space-y-2">
          <p
            class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
          >
            Tailwind + Naive UI
          </p>
          <h1 class="text-3xl font-bold text-slate-900 md:text-4xl">纯 Tailwind 样式示例页</h1>
          <p class="text-sm text-slate-600 md:text-base">
            组件交互使用 Naive UI，页面视觉和布局全部由 Tailwind 控制，无 Less 覆盖样式。
          </p>
        </div>
        <div class="flex items-center gap-2">
          <LanguageSwitch />
          <n-button tertiary type="default" @click="handleGoBack">返回主页</n-button>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-xs text-slate-500">组件库策略</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">默认样式优先</p>
          <p class="mt-1 text-sm text-slate-600">
            优先使用 Naive UI props 和 theme，不改内部结构。
          </p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-xs text-slate-500">布局策略</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">Tailwind 工具类</p>
          <p class="mt-1 text-sm text-slate-600">间距、栅格、响应式、文本层级全部在容器层完成。</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-xs text-slate-500">主题策略</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">统一配置入口</p>
          <p class="mt-1 text-sm text-slate-600">
            在 `NConfigProvider` 里维护字号、字体、主色等全局 token。
          </p>
        </div>
      </section>

      <n-card title="用户筛选" size="small">
        <div class="flex flex-wrap items-end gap-3">
          <div class="min-w-[260px] flex-1">
            <p class="mb-2 text-sm font-medium text-slate-700">关键词</p>
            <n-input
              v-model:value="searchValue"
              clearable
              placeholder="姓名 / 邮箱 / 角色 / 时间"
            />
          </div>
          <n-space>
            <n-button type="primary" @click="handleSearch">搜索</n-button>
            <n-button @click="handleReset">重置</n-button>
          </n-space>
        </div>
      </n-card>

      <n-card title="用户列表" size="small">
        <template #header-extra>
          <n-button type="primary" @click="handleAdd">新增用户</n-button>
        </template>
        <div>
          <n-data-table
            :columns="columns"
            :data="filteredTableData"
            :pagination="{ pageSize: 6 }"
            :row-key="rowKey"
            striped
          />
        </div>
      </n-card>
    </div>
  </div>
</template>
