import Vue from 'vue'
import App from './App.vue'

// 引入全局组件
import "./components/common"

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
