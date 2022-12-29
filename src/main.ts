import moshaToast from 'mosha-vue-toastify'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App)

app.use(moshaToast)
app.use(createPinia())
app.use(router)

app.mount('#app')
