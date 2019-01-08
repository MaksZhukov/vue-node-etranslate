import apiTranslate from '../../api/translate';
import { cacheTranslate } from '../../helpers';

const defaultState = () => ({
  inputText: '',
  outputText: '',
  from: { state: 'English', abbr: 'en' },
  to: { state: 'Русский', abbr: 'ru' },
  translateResponse: {},
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    translatePending(state, payload) {
      state.translateResponse = payload;
    },
    translateError(state, payload) {
      state.translateResponse = payload;
    },
    translateSuccess(state, payload) {
      state.translateResponse = payload;
      state.outputText = payload;
    },
    switchLanguages(state) {
      [state.inputText, state.outputText] = [state.outputText, state.inputText];
      [state.from, state.to] = [state.to, state.from];
    },
    updateInputText(state, text) {
      state.inputText = text;
    },
    updateFrom(state, lang) {
      state.from = lang;
    },
    updateTo(state, lang) {
      state.to = lang;
    },
    clearOutputText(state) {
      state.outputText = '';
      state.describeTranslate = { tr: [] };
    },
  },
  actions: {
    async translate({ commit }, { text, from, to }) {
      try {
        commit('translatePending', { pending: true });
        let response;
        if (cacheTranslate.get(text)) {
          response = cacheTranslate.get(text);
        } else {
          response = await apiTranslate.translate({ text, from, to });
          cacheTranslate.set(text, response);
        }
        commit('translateSuccess', response);
      } catch (error) {
        commit('translateError', { error });
      }
    },
  },
};
