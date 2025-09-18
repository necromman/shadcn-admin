import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/library-frontend': path.resolve(__dirname, './library-frontend'),
    },
  },
  server: {
    host: true, // 또는 '0.0.0.0'으로 설정하여 모든 네트워크 인터페이스에서 접속 가능
    port: 5173, // 기본 포트
    strictPort: false, // 포트가 사용 중이면 다음 포트 시도
  },
})
