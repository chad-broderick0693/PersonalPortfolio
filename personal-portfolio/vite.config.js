import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions
    }),
    vueJsx(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
