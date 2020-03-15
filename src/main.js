import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import ElementUI  from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/normlize.css'
import store from './store/index'
// import SocketIO from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io'

Vue.use(ElementUI)
Vue.use(VueAxios,axios)
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://127.0.0.1:9000/live/chat/1') 
// }))



Vue.config.productionTip = false


router.beforeEach((to,from,next)=>{
  //console.log(store.state,"store.state")
  next()
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
