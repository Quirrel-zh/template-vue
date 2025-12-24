import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  const loading = ref<boolean>(false)

  function showLoading() {
    loading.value = true
  }

  function hideLoading() {
    loading.value = false
  }

  return { loading, showLoading, hideLoading }
})
