import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from 'path'

export default defineConfig({
  plugins: [
    vue()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'dev.ricecandy.cn',
      'localhost',
      '127.0.0.1'
    ]
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src') // 更简洁的写法
    }
  }
})