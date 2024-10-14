import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import VueGridLayout from 'vue-grid-layout'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
// app.use(VueGridLayout.GridLayout)
// app.use(VueGridLayout)

app.mount('#app')
