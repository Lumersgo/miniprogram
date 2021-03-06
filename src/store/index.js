import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import user from '@/store/modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  modules: {
    user
  }
});
