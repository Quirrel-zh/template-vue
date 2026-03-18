<script setup lang="ts">
  import LanguageSwitch from '@/components/common/LanguageSwitch/index.vue'
  import Notice from './Notice.vue'
  import Profile from './Profile.vue'

  const props = defineProps<{
    collapsed: boolean
  }>()
  const emit = defineEmits<{
    'update:collapsed': [value: boolean]
  }>()

  function toggleCollapsed() {
    emit('update:collapsed', !props.collapsed)
  }
</script>

<template>
  <n-layout-header class="h-12 bg-transparent!">
    <div class="h-full w-full flex justify-between items-center">
      <UiIcon
        v-if="collapsed"
        icon="left_panel_open"
        size="lg"
        class="cursor-pointer"
        @click="toggleCollapsed"
      />
      <UiIcon
        v-else
        icon="left_panel_close"
        size="lg"
        class="cursor-pointer"
        @click="toggleCollapsed"
      />
      <div class="flex items-center h-full">
        <n-space :size="28" align="center">
          <n-button
            type="primary"
            style="background: linear-gradient(270deg, #0faddaff 0%, #328bf0ff 100%)"
          >
            <template #icon>
              <UiIcon icon="refresh" size="lg" />
            </template>
            {{ $t('layout.refresh') }}
          </n-button>
          <n-space align="center" :size="16">
            <Notice />
            <LanguageSwitch />
          </n-space>
        </n-space>
        <div class="h-5 w-px bg-[#dde2f0] mx-5"></div>
        <Profile />
      </div>
    </div>
  </n-layout-header>
</template>
