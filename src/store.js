import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routerPath: ""
  },
  mutations: {
    setRouterPath(state,path){
      state.routerPath = path;
    }
  },
  actions: {}
});
