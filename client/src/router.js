import Vue from 'vue';
import Router from 'vue-router';

const SignIn = () => import('./pages/SignIn.vue');
const SignUp = () => import('./pages/SignUp.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
    },
  ],
});
