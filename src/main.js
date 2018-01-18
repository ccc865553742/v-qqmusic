// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import FastClick from 'fastclick';
import VueTouch from 'vue-touch';
import VueLazyload from 'vue-lazyload';
import App from './App';
import store from './store';
import router from './router';

import '../static/css/icon.css';
import '../static/css/reset.css';


// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '../static/images/default_pic.jpg',
  attempt: 1,
});

Vue.use(VueTouch);
FastClick.attach(document.body);

// Object.defineProperty(Vue.prototype, '$http', { value: axios });
Object.defineProperty(Vue.prototype, '$http', { value: axios });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
