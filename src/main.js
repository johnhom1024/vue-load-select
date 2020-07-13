import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import directives from './directive.js'
Vue.use(directives)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
