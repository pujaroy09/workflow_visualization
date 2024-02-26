import './assets/main.css'
import mitt from 'mitt';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const eventBus = mitt();
app.use(router)
app.provide('eventBus',eventBus);
app.mount('#app')
