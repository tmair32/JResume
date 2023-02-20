import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import eslintPlugin from 'vite-plugin-eslint'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
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
    AutoImport({
      dirs: ['src/**/stores'],
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
    }),
    Components({
      deep: true,
      dirs: ['src/components', 'src/pages'],
      dts: true,
      extensions: ['vue', 'ts', 'tsx'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        IconsResolver({ componentPrefix: '' }),
      ],
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
    }),
    eslintPlugin(),
    Icons({
      autoInstall: true,
    }),
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
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
  },
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
