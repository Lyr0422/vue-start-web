import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import Element from 'element-ui'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 });

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
