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
    token: "",
    _id: "",
    isAdmin: false,
  },
  mutations: { 
    _Login (state, info_login) { // this.$store.commit("_Login","Pietro Smusi", "a");
      state.loggedIn = true;
      state.username = info_login.email;
      state.token = info_login.token;
      state._id = info_login.id;
      state.isAdmin = info_login.admin;
    },
    _Logout (state) {
      state.loggedIn = false;
      state.username = "";
      state.token = "";
      state._id = "";
      state.isAdmin = false;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn;
    },
    isAdmin: state => {
      return state.isAdmin;
    },
    getUsername: state => {
      return state.username;
    },
    getToken: state => {
      return state.token;
    },
    getId: state => {
      return state._id;
    }
  }
})
