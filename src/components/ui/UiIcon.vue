<script setup lang="ts">
  import { computed } from 'vue'

  type IconSize = 'sm' | 'md' | 'lg' | 'xl'

  const props = withDefaults(
    defineProps<{
      icon: string
      size?: IconSize
    }>(),
    {
      size: 'md',
    },
  )

  const sizeClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-xl'
      case 'xl':
        return 'text-2xl'
      default:
        return 'text-base'
    }
  })
</script>

<template>
  <span class="material-symbols ui-icon" :class="sizeClass" aria-hidden="true">
    {{ icon }}
  </span>
</template>
