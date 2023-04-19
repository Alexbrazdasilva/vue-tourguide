import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      name: 'vue-breadcrumb-tour',
      fileName: 'vb-tour',
      entry: resolve(__dirname, 'src/lib.js'),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
