<script setup lang="ts">
  import type { DropdownOption } from 'naive-ui'
  import type { SupportedLocale } from '@/constants/app'
  import UiIcon from '@/components/ui/UiIcon.vue'
  import { useLanguageSwitch } from './languageSwitch'

  const { currentLocale, setLocale } = useLanguageSwitch()

  const menuOptions: DropdownOption[] = [
    { key: 'zh-CN', label: '简体中文' },
    { key: 'en-US', label: 'English' },
  ]

  const handleSelect = (key: string | number) => {
    setLocale(key as SupportedLocale)
  }
</script>

<template>
  <n-dropdown
    trigger="click"
    placement="bottom-end"
    :options="menuOptions"
    :value="currentLocale"
    :style="{ minWidth: '120px' }"
    @select="handleSelect"
  >
    <button
      type="button"
      class="flex rounded-full cursor-pointer p-1 transition-colors hover:opacity-80"
      aria-label="切换语言"
    >
      <UiIcon icon="language" size="lg" class="text-gray-600" />
    </button>
  </n-dropdown>
</template>
