import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'
import 'flowbite'

const pinia = createPinia()

pinia.use(({store}) => {
    store.router = markRaw(router);
});

const app = createApp(App)
app.use(router)
app.use(store)
app.use(pinia)
app.mount('#app')