import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    wallet: ''
  },
  getters: {
    userName(state) {
      return state.userName
    },
    wallet(state) {
      return state.wallet
    }
  },
  mutations: {
    setUserName(state, name) {
      state.userName = name;
    },
    setWallet(state, wallet) {
      state.wallet = wallet
    }
  }

})