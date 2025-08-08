import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from 'path'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 @ 映射为 src 目录
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'dev.ricecandy.cn',
      'localhost',
      '127.0.0.1'
    ],
    // --- [核心修改] 在这里添加 proxy 配置 ---
    proxy: {
      // 将所有以 /api 开头的请求，都代理到您的 Worker 地址
      '/api': {
        target: 'https://login.kessoku.dpdns.org', // 这里写您的 Worker 地址
        changeOrigin: true, // 必须设置为 true，否则可能因为跨域问题失败
        // 我们不需要 rewrite，因为您的 Worker 路由本身就包含了 /api
      }
    }
  }
})
