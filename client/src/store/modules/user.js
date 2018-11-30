import apiUser from '../../api/user';

const defaultState = () => ({
  user: null,
  signInResponse: {},
  signUpResponse: {},
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    user(state) {
      return state.user;
    },
    signInResponse(state) {
      return state.signInResponse;
    },
    signUpResponse(state) {
      return state.signUpResponse;
    },
  },
  mutations: {
    signInPending(state, payload) {
      state = { ...state };
      state.signInResponse = payload;
    },
    signInError(state, payload) {
      state.signInResponse = payload;
    },
    signInSuccess(state, payload) {
      state.signInResponse = payload;
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
    reset(state) {
      state.user = defaultState();
    },
  },
  actions: {
    async signIn({ commit }, {
      email,
      password,
    }) {
      try {
        commit('signInPending', {
          pending: true,
        });
        const response = await apiUser.signIn({
          email,
          password,
        });
        commit('signInSuccess', response);
      } catch (error) {
        commit('signInError', {
          pending: false,
          error,
        });
      }
    },
    async signUp({
      commit,
    }, {
      email,
      password,
    }) {
      try {
        commit('signUpPending', {
          pending: true,
        });
        const response = await apiUser.signUp({
          email,
          password,
        });
        commit('signUpSuccess', response);
      } catch (error) {
        commit('signUpError', {
          pending: false,
          error,
        });
      }
    },
  },
};
