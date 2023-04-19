import App from './App.vue'
import { VBTourPlugin } from './lib'
import { createApp } from 'vue'

const app = createApp(App)

app.use(VBTourPlugin).mount('#app')
