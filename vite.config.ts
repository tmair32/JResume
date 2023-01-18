import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: string, fp: string) {
          if (fp.endsWith('variables.scss'))
            return source
          return `@import "~/assets/styles/_variables.scss"; ${source}`
        },
        sourceMap: false,
      },
    },
  },
  plugins: [eslintPlugin(), Unocss(), vue()],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
})
