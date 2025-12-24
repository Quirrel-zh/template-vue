<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { usePage } from './testView'

  const router = useRouter()
  const { searchValue, tableData, columns, handleSearch, handleReset, handleAdd, handleEdit } =
    usePage()

  const handleGoBack = () => {
    router.push('/')
  }
</script>

<template>
  <!-- 使用 Tailwind 进行页面布局和间距控制 -->
  <div class="test_view_root min-h-screen bg-gray-50 p-6">
    <!-- 页面标题区域 - 使用 Tailwind -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">示例页面</h1>
        <p class="text-gray-600">展示 Tailwind CSS 和 Ant Design 的配合使用</p>
      </div>
      <!-- 返回按钮 - 使用 Tailwind 控制位置 -->
      <a-button class="custom-back-btn" @click="handleGoBack">返回主页</a-button>
    </div>

    <!-- 搜索卡片 - Ant Design Card 组件，使用 Tailwind 控制间距 -->
    <!-- 注意：在 Ant Design 组件上使用 Tailwind 间距类时，需要使用 ! 修饰符或外层包裹 div -->
    <a-card class="custom-search-card no_title_border mb-6!" title="搜索区域">
      <div class="flex flex-wrap gap-4 items-end">
        <!-- 使用 Tailwind 控制输入框宽度和间距 -->
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-2"> 关键词搜索 </label>
          <a-input
            v-model:value="searchValue"
            placeholder="请输入搜索关键词"
            class="custom-input"
            allow-clear
          />
        </div>
        <!-- 使用 Tailwind 控制按钮组间距 -->
        <a-space class="shrink-0">
          <a-button class="custom-primary-btn" type="primary" @click="handleSearch">
            搜索
          </a-button>
          <a-button class="custom-reset-btn" @click="handleReset">重置</a-button>
        </a-space>
      </div>
    </a-card>

    <!-- 数据表格卡片 - Ant Design Card 和 Table 组件 -->
    <a-card class="custom-table-card" title="数据列表">
      <template #extra>
        <!-- 使用 Tailwind 控制按钮样式 -->
        <a-button class="custom-add-btn" type="primary" @click="handleAdd"> 新增 </a-button>
      </template>

      <!-- Ant Design Table 组件，使用 less 自定义样式 -->
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="{ pageSize: 10 }"
        class="custom-table"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <!-- 使用 Tailwind 控制 Tag 的显示 -->
            <a-tag
              :color="record.status === 'active' ? 'success' : 'default'"
              class="custom-status-tag"
            >
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <!-- 使用 Tailwind 控制操作按钮间距 -->
            <a-space class="gap-2">
              <a-button
                class="custom-edit-btn"
                type="link"
                size="small"
                @click="handleEdit(record as any)"
              >
                编辑
              </a-button>
              <a-button class="custom-delete-btn" type="link" size="small" danger> 删除 </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 说明区域 - 纯 Tailwind 样式 -->
    <!-- 注意：在 Ant Design 组件上使用 Tailwind 间距类时，使用 ! 修饰符 -->
    <a-card class="mt-6! custom-info-card">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">样式使用说明</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 class="font-semibold text-blue-800 mb-2">何时使用 Tailwind CSS</h3>
            <ul class="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>页面布局（flex、grid、spacing）</li>
              <li>响应式设计（md:、lg: 等断点）</li>
              <li>通用样式（颜色、字体、边框）</li>
              <li>快速原型和间距控制</li>
              <li>工具类样式（hover、focus 等状态）</li>
            </ul>
          </div>
          <div class="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 class="font-semibold text-green-800 mb-2">何时使用 Less</h3>
            <ul class="text-sm text-green-700 space-y-1 list-disc list-inside">
              <li>Ant Design 组件样式覆盖</li>
              <li>复杂的组件样式定制</li>
              <li>主题变量修改</li>
              <li>深度选择器（:deep()）样式</li>
              <li>组件级别的样式封装</li>
            </ul>
          </div>
        </div>
        <div class="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 class="font-semibold text-yellow-800 mb-2">⚠️ 重要提示：样式优先级</h3>
          <p class="text-sm text-yellow-700 mb-2">
            在 Ant Design 组件上直接使用 Tailwind 间距类时，由于 CSS 优先级问题，可能需要：
          </p>
          <ul class="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>使用 <code class="bg-yellow-100 px-1 rounded">!mb-6</code> 修饰符（推荐）</li>
            <li>
              或外层包裹 <code class="bg-yellow-100 px-1 rounded">&lt;div class="mb-6"&gt;</code>
            </li>
            <li>详见 <code class="bg-yellow-100 px-1 rounded">docs/STYLE_GUIDE.md</code> 文档</li>
          </ul>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
  // ========== 页面特定的 Ant Design 组件样式 ==========
  //
  // 判断标准（四个问题）：
  // 1️⃣ 是不是只影响当前页面？ ✅ 是
  // 2️⃣ 是否依赖页面结构或上下文？ ✅ 是
  // 3️⃣ 将来复用价值是否很低？ ✅ 是
  // 4️⃣ 用 Tailwind / token 是否做不到？ ✅ 是
  //
  // 全部是"是" → 写在 scoped less（使用 :deep）
  // 否则 → 放到全局 antd-overrides.less 或 ConfigProvider
  //
  // 详细说明请查看：docs/STYLE_GUIDE.md

  // 搜索卡片自定义样式
  .custom-search-card {
    // 使用 less 变量和嵌套
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    // 自定义卡片标题样式
    :deep(.ant-card-head-title) {
      font-weight: 600;
      color: #1f2937;
    }
  }

  // 输入框自定义样式
  .custom-input {
    // 自定义输入框边框和焦点状态
    :deep(.ant-input) {
      border-radius: 6px;
      transition: all 0.2s ease;

      &:focus,
      &:hover {
        border-color: #0e8c11;
        box-shadow: 0 0 0 2px rgba(14, 140, 17, 0.1);
      }
    }
  }

  // 主按钮自定义样式
  .custom-primary-btn {
    // 使用 less 变量
    background: linear-gradient(135deg, #0e8c11 0%, #1c751e 100%);
    border: none;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #1c751e 0%, #0e8c11 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(14, 140, 17, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // 重置按钮自定义样式
  .custom-reset-btn {
    border-radius: 6px;
    border-color: #d1d5db;

    &:hover {
      border-color: #0e8c11;
      color: #0e8c11;
    }
  }

  // 表格卡片自定义样式
  .custom-table-card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    :deep(.ant-card-head) {
      border-bottom: 2px solid #f3f4f6;
    }

    :deep(.ant-card-extra) {
      .ant-btn {
        border-radius: 6px;
      }
    }
  }

  // 新增按钮自定义样式
  .custom-add-btn {
    background: linear-gradient(135deg, #0e8c11 0%, #1c751e 100%);
    border: none;
    border-radius: 6px;
    font-weight: 500;

    &:hover {
      background: linear-gradient(135deg, #1c751e 0%, #0e8c11 100%);
    }
  }

  // 表格自定义样式
  .custom-table {
    // 自定义表格行样式
    :deep(.ant-table-tbody > tr) {
      transition: all 0.2s ease;

      &:hover {
        background-color: #f9fafb;
        transform: scale(1.01);
      }
    }

    // 自定义表头样式
    :deep(.ant-table-thead > tr > th) {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }

    // 自定义表格单元格样式
    :deep(.ant-table-tbody > tr > td) {
      border-bottom: 1px solid #f3f4f6;
    }
  }

  // 状态标签自定义样式
  .custom-status-tag {
    border-radius: 12px;
    padding: 2px 12px;
    font-weight: 500;
    font-size: 12px;
  }

  // 编辑按钮自定义样式
  .custom-edit-btn {
    padding: 0;
    height: auto;
    color: #0e8c11;

    &:hover {
      color: #1c751e;
    }
  }

  // 删除按钮自定义样式
  .custom-delete-btn {
    padding: 0;
    height: auto;

    &:hover {
      color: #ef4444;
    }
  }

  // 说明卡片自定义样式
  .custom-info-card {
    background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
    border: 1px solid #e5e7eb;

    :deep(.ant-card-body) {
      padding: 24px;
    }
  }

  // 返回按钮自定义样式
  .custom-back-btn {
    border-radius: 6px;
    border-color: #d1d5db;
    color: #6b7280;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateX(-2px);
    }
  }
</style>
