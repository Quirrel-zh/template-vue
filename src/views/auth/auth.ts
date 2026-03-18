import type { FormInst } from 'naive-ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from '@/utils/message'
import { getUserInfo, removeUserInfo, setUserInfo } from '@/utils/storage'

export function useAuth() {
  const { t } = useI18n()
  const formRef = ref<FormInst | null>(null)
  const userInfo = getUserInfo()
  const formData = ref<UserInfo>({
    username: userInfo?.username || '',
    password: userInfo?.password || '',
  })
  const formRules = ref({
    username: [{ required: true, message: t('auth.login.accountPlaceholder') }],
    password: [{ required: true, message: t('auth.login.passwordPlaceholder') }],
  })

  const remember = ref(localStorage.getItem('isRemember') === 'true')

  const handleRemember = () => {
    if (remember.value) {
      setUserInfo(formData.value)
      localStorage.setItem('isRemember', 'true')
    } else {
      removeUserInfo()
      localStorage.removeItem('isRemember')
    }
  }

  const handleLogin = () => {
    formRef.value?.validate().then(() => {
      handleRemember()
      message.success('成功')
    })
  }

  const handleForgotPassword = () => {
    console.info('--forgot-->')
  }

  return {
    formData,
    formRules,
    formRef,
    remember,

    handleLogin,
    handleForgotPassword,
  }
}
