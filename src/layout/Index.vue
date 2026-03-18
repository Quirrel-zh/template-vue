<script setup lang="ts">
  import { ref } from 'vue'
  import Header from './components/Header/Index.vue'
  import Sidebar from './components/Sidebar/Index.vue'

  const collapsed = ref(false)
</script>
<template>
  <n-layout has-sider class="ui-layout">
    <Sidebar v-model:collapsed="collapsed" />
    <n-layout class="bg-transparent! ml-7">
      <Header v-model:collapsed="collapsed" />
      <n-layout-content class="">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
