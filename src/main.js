import Vue from 'vue';
import VueCookies from 'vue-cookies';
import 'quasar-extras/material-icons';
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
VueCookies.config('1h')

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
