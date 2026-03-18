<script setup lang="ts">
  import { ref } from 'vue'

  // const value = ref('')

  const empty = ref(false)

  const messageList = ref([
    {
      title: '消息标题1',
      description: '消息描述1',
      time: '10:12',
      type: 'info',
      status: 'unread',
    },
    {
      title: '消息标题2',
      description: '消息描述2',
      time: '10:12',
      type: 'info',
      status: 'unread',
    },

    {
      title: '消息标题3',
      description: '消息描述3',
      time: '10:12',
      type: 'info',
      status: 'unread',
    },
  ])
</script>

<template>
  <n-popover
    trigger="hover"
    class="min-h-68 w-150"
    header-style="padding:12px 20px;"
    content-style="padding:26px 20px;"
  >
    <template #trigger>
      <n-badge dot :show="true">
        <UiIcon icon="notifications" size="lg" class="cursor-pointer text-gray-600" />
      </n-badge>
    </template>

    <template #header>
      <div class="flex items-center justify-between">
        <n-button text type="primary">{{ $t('layout.message.all') }}</n-button>
        <n-button text type="primary" :disabled="empty" @click="empty = !empty">{{
          $t('layout.message.ignore')
        }}</n-button>
      </div>
    </template>
    <div v-if="empty">
      <div class="h-68 flex flex-col items-center justify-center">
        <img src="@/assets/images/layout/no-message.png" alt="" class="w-26 h-19" />
        <p class="text-caption text-sm mt-2.5">{{ $t('layout.message.noMessage') }}</p>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center flex-col gap-4">
        <n-thing v-for="(value, index) in messageList" :key="value" content-indented class="w-full">
          <template #avatar>
            <div
              class="w-8 h-8 flex items-center justify-center rounded-xl bg-[#E8F4FF] text-primary"
            >
              <ui-icon icon="notifications_active" size="lg"></ui-icon>
            </div>
          </template>
          <template #header>
            <p class="text-title text-sm">{{ value.title }}</p>
          </template>
          <template #header-extra>
            <div class="flex items-center gap-1">
              <span class="text-caption text-sm">{{ value.time }}</span>
              <n-badge dot class="flex items-center" />
            </div>
          </template>
          <template #description>
            <p class="text-caption text-sm">{{ value.description }}</p>
          </template>
          <template #action>
            <n-button type="default">{{ $t('layout.message.viewDetail') }}</n-button>
            <div v-if="index !== 2" class="h-px w-full bg-[#E8F4FF] mt-4"></div>
          </template>
        </n-thing>
      </div>
    </div>
  </n-popover>
</template>

<style scoped></style>
