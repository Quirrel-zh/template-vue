<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { storeToRefs } from 'pinia'
  // [可选] 等比缩放方案：取消下方注释并注释掉固定 antFontSize 即可启用
  // import { useRem } from './composables/useRem'
  import { useCommonStore } from './stores/common'

  const commonStore = useCommonStore()
  const { loading } = storeToRefs(commonStore)

  // 固定字号（主流方案：不做等比缩放，使用固定 px/rem 值）
  const antFontSize = 16

  // [可选] 等比缩放方案（基准：2560px / 16px）
  // 注释掉上方 antFontSize，并取消下方注释即可切换
  // const { antFontSize } = useRem()
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="{ token: { fontSize: antFontSize, fontWeight: 400 } }">
    <a-spin tip="Loading..." :spinning="loading">
      <div class="main_container flex flex-col h-screen bg-white">
        <router-view />
      </div>
    </a-spin>
  </a-config-provider>
</template>

<style scoped></style>
