<script setup>
// 不需要额外的 import
</script>

<!-- 文件: src/App.vue -->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="HomeView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped>
</style>
