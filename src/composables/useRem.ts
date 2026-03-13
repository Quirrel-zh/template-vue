/**
 * useRem - 基于动态根字号的等比缩放方案
 *
 * 设计稿基准：2560 × 1440，1rem = 16px
 *
 * 公式：html font-size = BASE_FONT_SIZE × (window.innerWidth / BASE_WIDTH)
 * 同时钳制在 [MIN_FONT_SIZE, MAX_FONT_SIZE] 范围内，避免极端屏幕下失控
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

import debounce from '@/utils/debounce'

/** 设计稿基准宽度（px） */
const BASE_WIDTH = 2560
/** 基准字号（px），即设计稿宽度下 1rem 对应的像素值 */
const BASE_FONT_SIZE = 16
/** 最小允许根字号（px），防止小屏文字过小 */
const MIN_FONT_SIZE = 12
/** 最大允许根字号（px），防止超宽屏文字过大 */
const MAX_FONT_SIZE = 24

function calcFontSize(): number {
  const scale = window.innerWidth / BASE_WIDTH
  return Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, BASE_FONT_SIZE * scale))
}

function setRem(): number {
  const fontSize = calcFontSize()
  document.documentElement.style.fontSize = `${fontSize}px`
  return fontSize
}

/**
 * 在根组件中调用，动态设置 html 根字号实现 rem 等比缩放。
 * 返回当前根字号（px），可用于同步 Naive UI NConfigProvider 的 fontSize 配置。
 */
export function useRem() {
  const uiFontSize = ref(BASE_FONT_SIZE)

  function onResize() {
    uiFontSize.value = setRem()
  }

  const debouncedResize = debounce(onResize, 100)

  onMounted(() => {
    // 立即执行一次，无需等待 debounce
    uiFontSize.value = setRem()
    window.addEventListener('resize', debouncedResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debouncedResize)
  })

  return { uiFontSize }
}
