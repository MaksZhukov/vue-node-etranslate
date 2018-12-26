import apiTranslate from '../../api/translate';

const defaultState = () => ({
  inputText: '',
  outputText: '',
  from: { state: 'Русский', abbr: 'ru' },
  to: { state: 'English', abbr: 'en' },
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
      if (state.inputText) {
        state.outputText = payload;
      } else {
        state.outputText = '';
      }
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
    },
  },
  actions: {
    async translate({ commit }, { text, from, to }) {
      try {
        commit('translatePending', { pending: true });
        const response = await apiTranslate.translate({ text, from, to });
        if (response.status === 'error') {
          commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
          commit('translateSuccess', '');
        } else {
          commit('translateSuccess', response);
        }
      } catch (error) {
        commit('translateError', { error });
      }
    },
  },
};
