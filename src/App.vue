<script setup>
// 不需要额外的 import
</script>

<template>
  <!-- 使用 v-slot 获取当前路由的组件 -->
  <router-view v-slot="{ Component }">
    <!-- 使用 keep-alive 包裹，并指定只缓存 MusicPlayer 组件 -->
    <keep-alive include="MusicPlayer">
      <!-- 动态渲染当前路由的组件 -->
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped>
</style>
