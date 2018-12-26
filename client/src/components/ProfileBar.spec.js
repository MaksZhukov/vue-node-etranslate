import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Fragment from 'vue-fragment';
import VueRouter from 'vue-router';
import ProfileBar from './ProfileBar.vue';


describe('ProfileBar component', () => {
  let wrapper;
  let mutations;
  const email = 'example@mail.ru';
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuex);
    localVue.use(Fragment.Plugin);
    localVue.use(new VueRouter());
    mutations = {
      logOut: jest.fn(),
    };
    const store = new Vuex.Store({
      modules: {
        userModule: {
          namespaced: true,
          state: {},
          mutations,
        },
      },
    });
    wrapper = mount(ProfileBar, {
      localVue, store, propsData: { email }, stubs: { RouterLink: RouterLinkStub },
    });
  });
  it('profilebar shapshots have different email', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ email: 'newexample.@mail.ru' });
    expect(wrapper).toMatchSnapshot();
  });
  it(`profilebar email is ${email}`, () => {
    expect(wrapper.props('email')).toBe(email);
    expect(wrapper.find('.v-menu').text()).toContain(email);
  });
  it('profilebar has logout and dashboard link', () => {
    const arrayA = wrapper.findAll('a');
    expect(arrayA.at(1).text()).toContain('Dashboard');
    expect(arrayA.at(2).text()).toContain('Logout');
  });
  it('profilebar click logout was execute', () => {
    const arrayA = wrapper.findAll('a');
    arrayA.at(2).trigger('click');
    expect(mutations.logOut).toHaveBeenCalled();
  });
});
