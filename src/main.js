import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// tailwind css
import './index.css'
// vuex Store
import store from '../src/store/store.js'

const app = createApp(App)

app
    .use(store)
    .use(router)
    .mount('#app')
