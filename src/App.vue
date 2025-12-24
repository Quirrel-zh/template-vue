<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { storeToRefs } from 'pinia'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { useCommonStore } from './stores/common'
  import debounce from './utils/debounce'

  const commonStore = useCommonStore()
  const { loading } = storeToRefs(commonStore)

  const antFontSize = ref(14)

  function resize() {
    const width = window.innerWidth

    if (width >= 1920) antFontSize.value = 16
    else if (width >= 1440) antFontSize.value = 15
    else antFontSize.value = 14
  }
  const onResize = debounce(resize, 100)

  onMounted(() => {
    resize()
    window.addEventListener('resize', onResize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
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
