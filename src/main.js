// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import animated from 'animate.css'
import config from './config.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import global from '@/api/global_variable.js'

Vue.use(MuseUI);

Vue.use(ViewUI);
Vue.prototype.config = config
Vue.prototype.getGlobal = global
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animated)
Vue.use(Vant)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
