import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routerPath: "",
    username: ""
  },
  mutations: {
    setRouterPath(state, path){
      state.routerPath = path;
    },

    setUsername(state, name){
      state.username = name;
    }
  },
  actions: {}
});
