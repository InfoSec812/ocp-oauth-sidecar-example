import Vue from 'vue';
import VueCookies from 'vue-cookies';
import VueAuthenticate from 'vue-authenticate';

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
  bindRequestInterceptor: function () {
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },

  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  },
  baseUrl: 'http://localhost:8080/', // Your API domain

  // https://console.s11.core.rht-labs.com/oauth/authorize?
  //      response_type=token
  //      client_id=openshift-browser-client
  //      redirect_uri=http://localhost:3000/

  providers: {
    openshift: {
      name: "openshift",
      clientId: 'ocpoauthdemo',
      oauthType: '2.0',
      scope: ['user:info'],
      url: '/oauth/authorize',
      client_secret: 'b04817d8578911e99a93c725878bd64f',
      responseType: 'token',
      authorizationEndpoint: 'https://console.mcc.rht-labs.com:443/oauth/authorize',
      popupOptions: { width: 527, height: 582 },
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  }
})
VueCookies.config('1h')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
