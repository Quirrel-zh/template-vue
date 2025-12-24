<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { usePage } from './mainView'

  const router = useRouter()
  const { pageMsg } = usePage()

  const handleGoToTestView = () => {
    router.push('/test')
  }
</script>

<template>
  <!-- 使用 Tailwind 进行页面布局 -->
  <div
    class="main_view_root min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6"
  >
    <div class="max-w-2xl w-full">
      <!-- 主标题区域 - 使用 Tailwind -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-gray-800 mb-4">欢迎页面</h1>
        <p class="text-xl text-gray-600">{{ pageMsg }}</p>
      </div>

      <!-- 卡片容器 - 使用 Tailwind -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="space-y-6">
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">路由导航示例</h2>
            <p class="text-gray-600 mb-6">
              这是主页面（mainView），点击下方按钮可以跳转到测试页面（testView）
            </p>
          </div>

          <!-- 按钮区域 - 使用 Tailwind 控制布局 -->
          <div class="flex justify-center gap-4">
            <a-button
              class="custom-jump-btn"
              type="primary"
              size="large"
              @click="handleGoToTestView"
            >
              跳转到 TestView
            </a-button>
          </div>

          <!-- 说明信息 - 使用 Tailwind -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="text-sm text-gray-500 space-y-2">
              <p>📌 当前路由：/ (mainView)</p>
              <p>🔗 目标路由：/test (testView)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  // 使用 Less 自定义按钮样式
  .custom-jump-btn {
    min-width: 200px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
</style>
