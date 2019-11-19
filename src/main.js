import Vue from 'vue';
import App from './pages/App.vue';
import './assets/styles/reset.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI) //will mount `Vue.prototype.$message`

new Vue({
  render: h => h(App),
}).$mount('#app')


