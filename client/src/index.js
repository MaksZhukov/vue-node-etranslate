import Vue from 'vue';
import App from './pages/App.vue';
import router from './router';
import store from './store';
import './vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
