import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import 'virtual:uno.css'
import 'virtual:unocss-devtools'

import './style.css'
import '~/assets/styles/_index.scss'

const app = createApp(App)

// Pinia
const pinia = createPinia()
app.use(pinia)

// Mount app
app.mount('#app')
