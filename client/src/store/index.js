import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/user';
import userDictionaryModule from './modules/userDictionary';
import translateModule from './modules/translate';
import dictionaryModule from './modules/dictionary';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoad: false,
    snackBar: {
      visible: false,
      message: '',
      color: '',
    },
  },
  mutations: {
    showSnackBar(state, { message, color }) {
      state.snackBar = { visible: true, message, color };
    },
    hideSnackBar(state) {
      state.snackBar = { visible: false, message: '', color: '' };
    },
    loaded(state) {
      state.isLoad = true;
    },
  },
  modules: {
    userModule,
    translateModule,
    dictionaryModule,
    userDictionaryModule,
  },
});

export default store;
