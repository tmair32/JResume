import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
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
  define: {
    'process.env': process.env,
  },
  mode: process.env.MODE || process.env.NODE_ENV || 'development',
  plugins: [
    eslintPlugin(),
    Pages({
      dirs: [
        {
          dir: 'src/pages',
          baseRoute: '',
        },
      ],
      exclude: ['**/components/*.{vue,ts,tsx}'],
      extensions: ['vue', 'ts', 'tsx'],
    }),
    Unocss(),
    vue(),
  ],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    host: true,
    port: 5200,
  },
})
