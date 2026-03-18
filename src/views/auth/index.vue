<script setup lang="ts">
  import LanguageSwitch from '@/components/common/LanguageSwitch/index.vue'
  import LogoBar from '@/components/ui/LogoBar.vue'
  import { useAuth } from './auth'

  const {
    formData,
    formRules,
    remember,
    formRef,

    handleForgotPassword,
    handleLogin,
  } = useAuth()
</script>

<template>
  <div class="h-screen w-screen flex relative">
    <div class="h-9 flex items-center justify-between absolute top-10 left-12 right-12">
      <div class="flex items-center gap-5">
        <LogoBar />
      </div>
      <LanguageSwitch />
    </div>
    <div
      class="h-full min-w-0 flex-[942_1_0] bg-[url('@/assets/images/auth/leftSide.png')] bg-cover bg-center"
    ></div>
    <div
      class="h-full min-w-0 flex-[978_1_0] bg-[url('@/assets/images/auth/rightSide.png')] bg-cover bg-center flex items-center justify-center"
    >
      <div
        class="w-120 h-150 bg-white/70 rounded-2xl shadow-[0_2px_20px_0_#e5e7eb80] border border-solid border-white px-10 flex flex-col items-center justify-center"
      >
        <div class="w-full h-10 flex items-baseline-last gap-2.5 mb-9">
          <div class="text-title-xl font-medium text-title">{{ $t('auth.login.welcome') }}</div>
          <div class="text-base text-caption">{{ $t('auth.login.simple') }}</div>
        </div>
        <div>
          <n-form
            ref="formRef"
            class="w-100"
            size="large"
            :model="formData"
            :rules="formRules"
            :show-require-mark="false"
          >
            <n-form-item
              path="username"
              :label="$t('auth.login.account')"
              label-style="color: var(--text-color-body); font-size: 14px;"
            >
              <n-input
                v-model:value="formData.username"
                class="h-12! items-center rounded-xl!"
                :placeholder="$t('auth.login.accountPlaceholder')"
              />
            </n-form-item>
            <n-form-item
              path="password"
              :label="$t('auth.login.password')"
              label-style="color: var(--text-color-body); font-size: 14px;"
            >
              <n-input
                v-model:value="formData.password"
                class="rounded-xl! h-12! items-center"
                :placeholder="$t('auth.login.passwordPlaceholder')"
                type="password"
                show-password-on="click"
              />
            </n-form-item>
          </n-form>
          <div class="flex items-center justify-between mt-9">
            <n-checkbox v-model:checked="remember">{{ $t('auth.login.remember') }}</n-checkbox>
            <span class="text-body cursor-pointer hover:text-link" @click="handleForgotPassword">{{
              $t('auth.login.forgetPassword')
            }}</span>
          </div>
          <div class="w-full mt-12">
            <n-button type="primary" size="large" class="w-full! h-12!" @click="handleLogin">{{
              $t('auth.login.login')
            }}</n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
