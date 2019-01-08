import apiTranslate from '../../api/dictionary';
import { cacheDictionary } from '../../helpers';

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
        if (cacheDictionary.get(text)) {
          response = cacheDictionary.get(text);
        } else {
          response = await apiTranslate.getDictionary({ text, from, to });
          cacheDictionary.set(text, response);
        }
        commit('getDictionarySuccess', response);
      } catch (error) {
        commit('translateError', { error });
      }
    },
  },
};
