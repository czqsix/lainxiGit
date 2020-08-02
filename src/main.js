import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
Vue.config.devtools = false
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
import store from './store'
import router from './router'
import './assets/css/common.css'
import SimbaPlugin from '@/plugin'
Vue.use(SimbaPlugin)
// 改变了
import 'nprogress/nprogress.css'
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
