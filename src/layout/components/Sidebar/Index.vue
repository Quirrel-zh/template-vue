<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import LogoBar from '@/components/ui/LogoBar.vue'
  import { getMenuOptions } from '@/constants/menu'
  import { useLocaleStore } from '@/stores/locale'

  const props = defineProps<{
    collapsed: boolean
  }>()
  const emit = defineEmits<{
    'update:collapsed': [value: boolean]
  }>()

  const collapsed = computed({
    get: () => props.collapsed,
    set: (v) => emit('update:collapsed', v),
  })

  const { t } = useI18n()
  const menuOptions = computed(() => getMenuOptions(t))
  const activeKey = ref('')

  const { locale } = storeToRefs(useLocaleStore())
</script>
<template>
  <n-layout-sider
    v-model:collapsed="collapsed"
    class="bg-transparent!"
    collapse-mode="width"
    :width="locale === 'zh-CN' ? 180 : 220"
    :collapsed-width="64"
  >
    <div class="h-12 flex items-center justify-center"><LogoBar :collapsed="collapsed" /></div>

    <div class="mt-5">
      <n-menu
        v-model:value="activeKey"
        :root-indent="16"
        class="text-sm! font-medium"
        :options="menuOptions"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="24"
      />
    </div>
  </n-layout-sider>
</template>

<style scoped>
  :deep(.n-menu .n-menu-item-content.n-menu-item-content--selected::before) {
    background-color: #fff;
  }
  :deep(
    .n-menu
      .n-menu-item-content:not(
        .n-menu-item-content--disabled
      ).n-menu-item-content--selected:hover::before
  ) {
    background-color: #00a1ff0d;
  }

  :deep(.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before) {
    background-color: #00a1ff0d;
  }
</style>
