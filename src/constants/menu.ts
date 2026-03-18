import type { MenuOption } from 'naive-ui'
import { NEllipsis } from 'naive-ui'
import { h } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'

function renderIcon(icon: string) {
  return () => h(UiIcon, { icon, size: 'lg' })
}

export function getMenuOptions(t: (key: string) => string): MenuOption[] {
  return [
    {
      label: () => h(NEllipsis, null, { default: () => t('menu.dashboard') }),
      key: 'dashboard',
      icon: renderIcon('speed'),
      route: '/dashboard',
    },
    {
      label: () => h(NEllipsis, null, { default: () => t('menu.basePlatform') }),
      key: 'basePlatform',
      icon: renderIcon('account_tree'),
      route: '/basePlatform',
      children: [
        {
          label: () => h(NEllipsis, null, { default: () => t('menu.organization') }),
          key: 'organization',
          route: '/basePlatform/organization',
        },
        {
          label: () => h(NEllipsis, null, { default: () => t('menu.rolePermission') }),
          key: 'rolePermission',
          route: '/basePlatform/rolePermission',
        },
        {
          label: () => h(NEllipsis, null, { default: () => t('menu.positionCost') }),
          key: 'positionCost',
          route: '/basePlatform/positionCost',
        },
        {
          label: () => h(NEllipsis, null, { default: () => t('menu.generalSettings') }),
          key: 'generalSettings',
          route: '/basePlatform/generalSettings',
        },
      ],
    },
    {
      label: () => h(NEllipsis, null, { default: () => t('menu.operationRules') }),
      key: 'operationRules',
      icon: renderIcon('work'),
      route: '/operationRules',
      children: [
        {
          label: () => h(NEllipsis, null, { default: () => t('menu.projectConfig') }),
          key: 'projectConfig',
          route: '/operationRules/projectConfig',
        },
      ],
    },
    {
      label: () => h(NEllipsis, null, { default: () => t('menu.engineHub') }),
      key: 'engineHub',
      icon: renderIcon('automation'),
      route: '/engineHub',
    },
    {
      label: () => h(NEllipsis, null, { default: () => t('menu.humanResource') }),
      key: 'humanResource',
      icon: renderIcon('assignment_ind'),
      route: '/humanResource',
    },
    {
      label: () => h(NEllipsis, null, { default: () => t('menu.opsCommunication') }),
      key: 'opsCommunication',
      icon: renderIcon('forum'),
      route: '/opsCommunication',
    },
  ]
}
