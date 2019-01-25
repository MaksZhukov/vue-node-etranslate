import apiUserDictionary from '../../api/userDictionary';

const defaultState = () => ({
  userDictionary: [],
  getUserDictionaryResponse: {},
  addToUserDictionaryResponse: {},
  removeFromUserDictionaryResponse: {},
  removeSelectedFromUserDictionaryResponse: {},
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    addToUserDictionaryPending(state, payload) {
      state.addToDictionaryResponse = payload;
    },
    addToUserDictionaryError(state, payload) {
      state.addToDictionaryResponse = payload;
    },
    addToUserDictionarySuccess(state, payload) {
      state.addToUserDictionaryResponse = payload;
      state.userDictionary.push(payload.data);
    },
    removeFromUserDictionaryPending(state, payload) {
      state.removeFromUserDictionaryResponse = payload;
    },
    removeFromUserDictionaryError(state, payload) {
      state.removeFromUserDictionaryResponse = payload;
    },
    removeFromUserDictionarySuccess(state, { response, ids }) {
      state.removeFromUserDictionaryResponse = response;
      state.userDictionary = state.userDictionary.filter(item => !ids.includes(item.id));
    },
    getUserDictionaryPending(state, payload) {
      state.getUserDictionaryResponse = payload;
    },
    getUserDictionaryError(state, payload) {
      state.getUserDictionaryResponse = payload;
    },
    getUserDictionarySuccess(state, payload) {
      state.getUserDictionaryResponse = payload;
      state.userDictionary = payload;
    },
  },
  actions: {
    async getUserDictionary({ commit, rootState }) {
      try {
        commit('getUserDictionaryPending', { pending: true });
        const response = await apiUserDictionary.getUserDictionary(rootState.userModule.user.id);
        if (response.status === 'error') {
          throw response;
        }
        commit('getUserDictionarySuccess', response);
      } catch (error) {
        commit('showSnackBar', { message: error.message, color: 'error' }, { root: true });
        commit('removeFromUserDictionaryError', error);
      }
    },
    async removeFromUserDictionary({ commit }, ids) {
      let response;
      try {
        commit('removeFromUserDictionaryPending', { pending: true });
        response = await apiUserDictionary.removeFromUserDictionary(ids);
        if (response.status === 'error') {
          throw response;
        }
        commit('removeFromUserDictionarySuccess', { response, ids });
      } catch (error) {
        commit('removeFromUserDictionaryError', error);
      }
      if (response) {
        commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
      }
    },
    async addToUserDictionary({ commit, rootState }, {
      text, translate, textLang, translateLang,
    }) {
      try {
        commit('addToUserDictionaryPending', { pending: true });
        const response = await apiUserDictionary.addToUserDictionary(
          {
            userId: rootState.userModule.user.id, text, translate, textLang, translateLang,
          },
        );
        if (response.status === 'error') {
          throw response;
        }
        commit('addToUserDictionarySuccess', response);
        commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
      } catch (error) {
        commit('showSnackBar', { message: error.message, color: 'error' }, { root: true });
        commit('addToUserDictionaryError', error);
      }
    },
  },
};
