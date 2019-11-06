import Vue from 'vue';
import App from './pages/App.vue';
import './assets/styles/reset.less';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
