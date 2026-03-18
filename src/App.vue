<script setup lang="ts">
  import type { SupportedLocale } from '@/constants/app'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import { useLocaleEffect } from './composables/useLocaleEffect'
  import { useCommonStore } from './stores/common'
  import { useLocaleStore } from './stores/locale'
  import { naiveThemeOverrides } from './theme/naiveTheme'
  import { getNaiveLocale } from './utils/naiveLocale'
  // [可选] 等比缩放方案：取消下方注释并注释掉固定 uiFontSize 即可启用
  // import { useRem } from './composables/useRem'

  useLocaleEffect()

  const commonStore = useCommonStore()
  const { loading } = storeToRefs(commonStore)
  const { locale } = storeToRefs(useLocaleStore())

  const naiveLocale = computed(() => getNaiveLocale(locale.value as SupportedLocale))
</script>

<template>
  <n-message-provider>
    <n-config-provider
      :locale="naiveLocale.locale"
      :date-locale="naiveLocale.dateLocale"
      :theme-overrides="naiveThemeOverrides"
    >
      <n-spin :show="loading" description="Loading...">
        <div class="main_container flex flex-col h-screen bg-white">
          <router-view />
        </div>
      </n-spin>
      <n-global-style />
    </n-config-provider>
  </n-message-provider>
</template>

<style scoped></style>
