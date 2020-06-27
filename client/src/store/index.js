import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import app from './Modules/app'
export default new Vuex.Store({
 
  modules: {
    app
  }
});
