import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cr: {},
  },
  mutations: {
    addField: (key, value) => {
      cr[key] = value;
    }
  },
  actions: {
  }
})
