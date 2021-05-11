import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from './store/index'
import components from './components'
//注入全局样式
import './assets/public.scss'
//引入video.js样式
import 'video.js/dist/video-js.css'
//引入jquery.danmu
import './static/jquery-3.6.0'
import './static/jquery.danmu.min.js'

Vue.use(ElementUI)
//注入全局组件
Vue.use(components)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
