import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {
  Quasar,
  QBtn,
  QLayout,
  QLayoutHeader,
  QLayoutDrawer,
  QPage,
  QPageContainer,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItemSeparator,
  QItem,
  QItemSide,
  QItemMain,
} from 'quasar';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import './styles/quasar.styl';
import store from './store'

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QPage,
    QPageContainer,
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItemSeparator,
    QItem,
    QItemSide,
    QItemMain,
  },
  directives: {
  },
  plugins: {
  },
});

Vue.config.productionTip = false;

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000/', // Your API domain

  providers: {
    openshift: {
      name: "openshift",
      authorizationEndpoint: 'https://console.s11.core.rht-labs.com:443/oauth/authorize',
      redirectUri: 'http://localhost:3000/' // Your client app URL
    }
  }
})
VueCookies.config('1h')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
