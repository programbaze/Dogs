import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/output.css'
import {createPinia} from "pinia";

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

createApp(App).use(router).mount('#app')

