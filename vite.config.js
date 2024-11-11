import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true
      }
    }
  },
  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ['legacy-js-api'],
            },
        },
    },
},
})
