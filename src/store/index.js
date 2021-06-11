import Vue from 'vue'
import Vuex from 'vuex'
import boardStore from "./board/boardStore";
import authStore from "./account/authStore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardStore,
    authStore,
  }
})
