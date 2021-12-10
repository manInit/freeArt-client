import './styles/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcon from './utils/fontawesome'
import router from './router'
import store from './store'
import setTheme from './utils/setTheme'
import './registerServiceWorker'

setTheme(localStorage.getItem('theme') ?? 'light')


createApp(App)
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
