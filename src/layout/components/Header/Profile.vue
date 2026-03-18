<script setup lang="ts">
  import { NAvatar, NText } from 'naive-ui'
  import { computed, h } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import defaultAvatar from '@/assets/images/layout/default.png'
  import { renderIcon } from '@/utils/renderIcon'

  const router = useRouter()
  const { t } = useI18n()

  function renderCustomHeader() {
    return h(
      'div',
      {
        class: 'flex flex-col p-2 w-70',
      },
      [
        h(
          'span',
          { class: 'text-sm text-caption mb-2' },
          { default: () => t('layout.profile.currentAccount') },
        ),
        h(
          'div',
          {
            style: 'display: flex; align-items: center ; ',
          },
          [
            h(NAvatar, {
              round: true,
              style: 'margin-right: 12px;',
              src: defaultAvatar,
            }),
            h('div', null, [
              h('div', null, [
                h('div', { class: 'text-title text-sm' }, { default: () => '打工仔' }),
              ]),
              h('div', { style: 'font-size: 12px;' }, [
                h(NText, { depth: 3 }, { default: () => '132****1234' }),
              ]),
            ]),
          ],
        ),
      ],
    )
  }

  // [note] 这里要使用computed才能保证多语言切换的响应式，需要注意
  const options = computed(() => [
    {
      key: 'header',
      type: 'render',
      render: renderCustomHeader,
    },
    {
      key: 'header-divider',
      type: 'divider',
    },
    {
      label: t('layout.profile.accountInfoSecurity'),
      key: 'accountInfo',
      router: '',
      icon: renderIcon('person', 'lg'),
    },
    {
      label: t('layout.profile.logout'),
      key: 'logout',
      icon: renderIcon('logout', 'lg'),
      props: {
        onClick: () => router.push('/login'),
      },
    },
  ])
</script>
<template>
  <n-dropdown trigger="click" :options="options">
    <div class="flex items-center cursor-pointer gap-3">
      <NAvatar size="medium" round :src="defaultAvatar" :fallback-src="defaultAvatar" />
      <span class="text-title text-sm">Admin</span>
      <UiIcon icon="keyboard_arrow_down" size="lg" />
    </div>
  </n-dropdown>
</template>
