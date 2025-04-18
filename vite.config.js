import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 5173, // 默认端口
    allowedHosts: [
      'dev.ricecandy.cn', // 添加你的自定义域名
      'localhost', // 保留本地访问
      '127.0.0.1' // 保留本地IP访问
    ]
  }
})