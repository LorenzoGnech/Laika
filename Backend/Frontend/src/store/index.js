import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    loggedIn: false,
    username: "",
    token: ""
  },
  mutations: { 
    _Login (state, username, token) { // this.$store.commit("_Login","Pietro Smusi", "a");
      state.loggedIn = true;
      state.username = username;
      state.token = token;
    },
    _Logout (state) {
      state.loggedIn = false;
      state.username = "";
      state.token = "";
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn;
    }
  }
})
