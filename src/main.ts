import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Router
import autoRoutes from 'virtual:generated-pages'
import type { RouterScrollBehavior } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

// UnoCSS
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

// SCSS
import '~/assets/styles/_index.scss'

const app = createApp(App)

// Router
const routes = autoRoutes.map((route) => {
  return {
    ...route,
    alias: route.path.endsWith('/') ? `${route.path}index` : route.path,
  }
})

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  else if (to.hash) {
    return { el: to.hash }
  }
  else {
    return {
      behavior: 'smooth',
      left: 0,
      top: 0,
    }
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})

app.use(router)

// Pinia
const pinia = createPinia()
app.use(pinia)

// Mount app
app.mount('#app')
