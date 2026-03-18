<script setup lang="ts">
  import { useRouter } from 'vue-router'

  defineProps<{
    collapsed?: boolean
  }>()

  const router = useRouter()
</script>

<template>
  <div
    class="flex cursor-pointer items-center gap-2"
    :class="collapsed ? 'justify-center' : ''"
    @click="router.push('/')"
  >
    <div class="h-9 w-9 shrink-0">
      <img src="@/assets/images/logo.png" alt="logo" />
    </div>
    <div v-show="!collapsed" class="text-title-lg font-bold text-title truncate">
      {{ $t('auth.logoTitle') }}
    </div>
  </div>
</template>
