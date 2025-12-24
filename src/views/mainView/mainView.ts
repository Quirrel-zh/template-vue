import { onMounted, ref } from 'vue'

export function usePage() {
  const pageMsg = ref('mainView')

  onMounted(() => {
    console.info('onMounted', pageMsg.value)
  })
  return {
    pageMsg,
  }
}
