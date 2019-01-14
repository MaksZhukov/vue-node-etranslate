import apiUser from '../../api/user';
import router from '../../router';
import { setItemsToLocalStorage } from '../../helpers';

const defaultState = () => ({
  user: null,
  signInResponse: {},
  signUpResponse: {},
  sendLinkEmailForRecoverResponse: {},
  changePasswordResponse: {},
  checkTokenResponse: {},
  checkRecoverTokenResponse: {},
  updateTokensResponse: {},
});

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    signInPending(state, payload) {
      state.signInResponse = payload;
    },
    signInError(state, payload) {
      state.signInResponse = payload;
    },
    signInSuccess(state, payload) {
      state.signInResponse = payload;
    },
    setUser(state, payload) {
      state.user = { email: payload.email };
    },
    signUpPending(state, payload) {
      state.signUpResponse = payload;
    },
    signUpError(state, payload) {
      state.signUpResponse = payload;
    },
    signUpSuccess(state, payload) {
      state.signUpResponse = payload;
    },
    sendLinkEmailForRecoverSuccess(state, payload) {
      state.sendLinkEmailForRecoverResponse = payload;
    },
    sendLinkEmailForRecoverPending(state, payload) {
      state.sendLinkEmailForRecoverResponse = payload;
    },
    sendLinkEmailForRecoverError(state, payload) {
      state.sendLinkEmailForRecoverResponse = payload;
    },
    checkTokenPending(state, payload) {
      state.checkTokenResponse = payload;
    },
    checkTokenError(state, payload) {
      state.checkTokenResponse = payload;
    },
    checkTokenSuccess(state, payload) {
      state.checkTokenResponse = payload;
      state.user = payload;
    },
    checkRecoverTokenSuccess(state, payload) {
      state.checkRecoverTokenResponse = payload;
    },
    checkRecoverTokenPending(state, payload) {
      state.checkRecoverTokenResponse = payload;
    },
    checkRecoverTokenError(state, payload) {
      state.checkRecoverTokenResponse = payload;
    },
    changePasswordSuccess(state, payload) {
      state.changePasswordResponse = payload;
    },
    changePasswordPending(state, payload) {
      state.changePasswordResponse = payload;
    },
    changePasswordError(state, payload) {
      state.changePasswordResponse = payload;
    },
    updateTokensPending(state, payload) {
      state.updateTokensResponse = payload;
    },
    updateTokensError(state, payload) {
      state.updateTokensResponse = payload;
    },
    updateTokensSuccess(state, payload) {
      state.updateTokensResponse = payload;
      const { accessToken, refreshToken, expiresIn } = payload;
      setItemsToLocalStorage({ accessToken, refreshToken, expiresIn });
    },
    logOut(state) {
      const initialState = defaultState();
      localStorage.clear();
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key];
      });
      router.push('sign-in');
    },
  },
  actions: {
    async signIn({ commit }, { email, password }) {
      try {
        commit('signInPending', { pending: true });
        const response = await apiUser.signIn({ email, password });
        commit('signInSuccess', response);
        if (response.status === 'success') {
          commit('setUser', response);
          const { accessToken, refreshToken, expiresIn } = response;
          setItemsToLocalStorage({ accessToken, refreshToken, expiresIn });
          router.push('dashboard');
        }
        commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
      } catch (error) {
        commit('signInError', error);
      }
    },
    async signUp({ commit }, { email, password }) {
      try {
        commit('signUpPending', { pending: true });
        const response = await apiUser.signUp({ email, password });
        commit('signUpSuccess', response);
        commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
      } catch (error) {
        commit('signUpError', error);
      }
    },
    async checkToken({ commit }) {
      try {
        commit('checkTokenPending', { pending: true });
        const response = await apiUser.checkToken();
        commit('checkTokenSuccess', response);
        return response;
      } catch (error) {
        commit('checkTokenError', error);
        commit('logOut');
      }
      return {};
    },
    async updateTokens({ commit }) {
      try {
        commit('updateTokensPending', { pending: true });
        const response = await apiUser.updateTokens();
        commit('updateTokensSuccess', response);
      } catch (error) {
        commit('updateTokensError', error);
        commit('logOut');
      }
    },
    async sendLinkEmailForRecover({ commit }, email) {
      try {
        commit('sendLinkEmailForRecoverPending', { pending: true });
        const response = await apiUser.sendLinkEmailForRecover(email);
        commit('sendLinkEmailForRecoverSuccess', response);
        commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
      } catch (error) {
        commit('sendLinkEmailForRecoverError', error);
      }
    },
    async checkRecoverToken({ commit }, token) {
      try {
        commit('checkRecoverTokenPending', { pending: true });
        const response = await apiUser.checkRecoverToken(token);
        commit('checkRecoverTokenSuccess', response);
      } catch (error) {
        commit('checkRecoverTokenError', error);
      }
    },
    async changePassword({ commit }, { token, password }) {
      try {
        commit('changePasswordPending', { pending: true });
        const response = await apiUser.changePassword({ token, password });
        commit('changePasswordSuccess', response);
        if (response.status === 'success') {
          router.push('/sign-in');
        }
        commit('showSnackBar', { message: response.message, color: response.status }, { root: true });
      } catch (error) {
        commit('changePasswordError', error);
      }
    },
  },
};
