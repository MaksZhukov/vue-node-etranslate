import apiDictionary from '../../api/userDictionary';
import { checkItemsInLocalStorage } from '../../helpers';

const defaultState = () => ({
  dictionary: [],
  getDictionaryResponse: {},
  addToDictionaryResponse: {},
  removeFromDictionaryResponse: {},
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    addToDictionaryPending(state, payload) {
      state.addToDictionaryResponse = payload;
    },
    addToDictionaryError(state, payload) {
      state.addToDictionaryResponse = payload;
    },
    addToDictionarySuccess(state, payload) {
      state.addToDictionaryResponse = payload;
      state.dictionary.push(payload);
    },
    removeFromDictionaryPending(state, payload) {
      state.removeFromDictionaryResponse = payload;
    },
    removeFromDictionaryError(state, payload) {
      state.removeFromDictionaryResponse = payload;
    },
    removeFromDictionarySuccess(state, payload) {
      state.removeFromDictionaryResponse = payload;
      state.dictionary = state.dictionary.filter(item => item.id !== payload);
    },
    getDictionaryPending(state, payload) {
      state.getDictionaryResponse = payload;
    },
    getDictionaryError(state, payload) {
      state.getDictionaryResponse = payload;
    },
    getDictionarySuccess(state, payload) {
      state.getDictionaryResponse = payload;
      state.dictionary = payload;
    },
  },
  actions: {
    async getDictionary({ commit, rootState, dispatch }) {
      try {
        const isTokensAndExpiresIn = checkItemsInLocalStorage(['refreshToken', 'accessToken', 'expiresIn']);
        if (isTokensAndExpiresIn && localStorage.getItem('expiresIn') < new Date().getTime() / 1000) {
          await dispatch('userModule/updateTokens', {}, { root: true });
          if (!rootState.userModule.user) {
            return;
          }
        }
        commit('getDictionaryPending', { pending: true });
        const response = await apiDictionary.getDictionary(rootState.userModule.user.id);
        commit('getDictionarySuccess', response);
      } catch (error) {
        commit('getDictionaryError', { error });
      }
    },
    async removeFromDictionary({ commit, rootState, dispatch }, id) {
      try {
        const isTokensAndExpiresIn = checkItemsInLocalStorage(['refreshToken', 'accessToken', 'expiresIn']);
        if (isTokensAndExpiresIn && localStorage.getItem('expiresIn') < new Date().getTime() / 1000) {
          await dispatch('userModule/updateTokens', {}, { root: true });
          if (!rootState.userModule.user) {
            return;
          }
        }
        commit('removeFromDictionaryPending', { pending: true });
        await apiDictionary.removeFromDictionary(id);
        commit('removeFromDictionarySuccess', id);
      } catch (error) {
        commit('removeFromDictionaryError', { error });
      }
    },
    async addToDictionary({ commit, rootState, dispatch }, { text, translate }) {
      try {
        const isTokensAndExpiresIn = checkItemsInLocalStorage(['refreshToken', 'accessToken', 'expiresIn']);
        if (isTokensAndExpiresIn && localStorage.getItem('expiresIn') < new Date().getTime() / 1000) {
          await dispatch('userModule/updateTokens', {}, { root: true });
          if (!rootState.userModule.user) {
            return;
          }
        }
        commit('addToDictionaryPending', { pending: true });
        const response = await apiDictionary.addToDictionary(
          { userId: rootState.userModule.user.id, text, translate },
        );
        commit('addToDictionarySuccess', response);
      } catch (error) {
        commit('addToDictionaryError', { error });
      }
    },
  },
};
