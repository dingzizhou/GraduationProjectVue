import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port:80,
    proxy:{
      //开发路径
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        rewrite:(path) => path.replace('/api','')
      }
    }
  },
})
