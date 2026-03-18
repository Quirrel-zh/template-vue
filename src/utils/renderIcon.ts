import { h } from 'vue'
import UiIcon from '@/components/ui/UiIcon.vue'

export function renderIcon(icon: string, size: 'sm' | 'md' | 'lg' | 'xl' = 'lg') {
  return () => h(UiIcon, { icon, size })
}
