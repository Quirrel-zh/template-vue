# Tailwind CSS 与 Naive UI 协作指南

## 目标

本项目的样式策略已统一为：

- **Tailwind CSS**：负责布局、间距、排版、响应式和视觉细节
- **Naive UI**：负责交互组件与可访问性能力
- **NConfigProvider**：负责全局主题（字号、字体、颜色 token）

> 默认不使用 Less 覆盖 Naive UI 内部样式。

## 核心原则

1. **先用组件 props，再用 Tailwind**
   - 优先使用 Naive UI 自带参数（如 `size`、`type`、`tertiary`、`bordered`、`striped`）
   - 再用 Tailwind 处理外层容器样式（间距、背景、边框、栅格）

2. **样式写在容器层，不写在组件内部结构**
   - 推荐：`<div class="p-6 rounded-xl"> <n-card /> </div>`
   - 不推荐：通过深层选择器改 `.n-card__*` 或 `.n-data-table-*`

3. **主题统一走 `NConfigProvider`**
   - 字体族、基础字号、主色、圆角等全局一致项，放到根组件主题配置

4. **仅在极少数场景使用局部 CSS**
   - 仅当 Tailwind + 组件 props + theme 都无法满足时，才新增 scoped CSS
   - 避免引入 Less 作为常规方案

## 推荐写法

### 布局与卡片

```vue
<div class="space-y-6">
  <n-card title="筛选区" size="small">
    <div class="grid gap-3 md:grid-cols-3">
      <!-- 内容 -->
    </div>
  </n-card>
</div>
```

### 按钮和状态

```vue
<n-space>
  <n-button type="primary">保存</n-button>
  <n-button tertiary>返回</n-button>
  <n-tag type="success" bordered={false}>启用</n-tag>
</n-space>
```

### 表格容器

```vue
<div class="rounded-lg border border-slate-200 overflow-hidden">
  <n-data-table :columns="columns" :data="list" striped size="small" />
</div>
```

## 何时允许写额外 CSS

同时满足以下条件时可以写少量 scoped CSS：

- 业务有明确定制要求
- Naive UI props 无法表达
- Tailwind 工具类也无法表达
- 影响范围限定在当前页面或当前组件

若需要跨页面复用，请优先抽离为可复用组件，而不是写全局覆盖样式。

## 参考页面

- 示例页面：`src/views/testView/testView.vue`
