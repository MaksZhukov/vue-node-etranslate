import apiTranslate from '../../api/dictionary';
import { cacheDictionary, queryString } from '../../helpers';

const defaultState = () => ({
  getDictionaryResponse: {},
  dictionary: [],
  dictionaryFromLang: [],
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    getDictionaryPending(state, payload) {
      state.getDictionaryResponse = payload;
    },
    getDictionaryError(state, payload) {
      state.getDictionaryResponse = payload;
    },
    getDictionarySuccess(state, payload) {
      state.getDictionaryResponse = payload;
      state.dictionary = payload.dictionary.def;
      state.dictionaryFromLang = payload.dictionaryFromLang.def;
    },
    clearDictionaries(state) {
      state.dictionary = [];
      state.dictionaryFromLang = [];
    },
  },
  actions: {
    async getDictionary({ commit }, { text, from, to }) {
      try {
        commit('getDictionaryPending', { pending: true });
        let response;
        if (cacheDictionary.get(`${text}-${to}`)) {
          response = cacheDictionary.get(`${text}-${to}`);
        } else {
          response = await apiTranslate.getDictionary(queryString({ text, from, to }));
          cacheDictionary.set(`${text}-${to}`, response);
        }
        if (response.status === 'error') {
          throw response;
        }
        commit('getDictionarySuccess', response);
      } catch (error) {
        commit('getDictionaryError', error);
        commit('showSnackBar', { message: error.message, color: 'error' }, { root: true });
      }
    },
  },
};
