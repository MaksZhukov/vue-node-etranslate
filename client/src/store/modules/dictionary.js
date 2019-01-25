import apiTranslate from '../../api/dictionary';
import { cacheDictionary, queryString } from '../../helpers';

const defaultState = () => ({
  getDictionaryResponse: {},
  dictionaryTranslateLang: [],
  dictionaryTextLang: [],
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
      state.dictionaryTranslateLang = payload.dictionaryTranslateLang.def;
      state.dictionaryTextLang = payload.dictionaryTextLang.def;
    },
    clearDictionaries(state) {
      state.dictionaryTranslateLang = [];
      state.dictionaryTextLang = [];
    },
  },
  actions: {
    async getDictionary({ commit }, { text, textLang, translateLang }) {
      try {
        commit('getDictionaryPending', { pending: true });
        let response;
        if (cacheDictionary.get(`${text}-${textLang}-${translateLang}`)) {
          response = cacheDictionary.get(`${text}-${textLang}-${translateLang}`);
        } else {
          response = await apiTranslate.getDictionary(
            queryString({ text: encodeURIComponent(text), textLang, translateLang }),
          );
          cacheDictionary.set(`${text}-${textLang}-${translateLang}`, response);
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
