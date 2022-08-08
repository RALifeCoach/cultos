import {createApp} from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { library, dom } from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, far)
dom.watch()

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(ElementPlus)
  .mount('#app')