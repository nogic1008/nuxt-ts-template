import {
  createLocalVue,
  mount,
  RouterLinkStub,
  shallowMount
} from '@vue/test-utils'
import Buefy from 'buefy'

import DefaultLayout from '~/layouts/default.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('layouts/default.vue', () => {
  let wrapper: ReturnType<typeof mount>
  const methods = {
    localePath: (obj: object) => obj
  }

  beforeEach(() => {
    wrapper = shallowMount(DefaultLayout, {
      localVue,
      methods,
      stubs: {
        NuxtLink: RouterLinkStub,
        Nuxt: true,
        Navbar: true
      }
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      methods,
      stubs: {
        NuxtLink: RouterLinkStub,
        Nuxt: true,
        Navbar: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
