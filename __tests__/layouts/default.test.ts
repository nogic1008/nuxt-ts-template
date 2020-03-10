import {
  createLocalVue,
  mount,
  RouterLinkStub,
  shallowMount,
  Wrapper
} from '@vue/test-utils'
import Buefy from 'buefy'

import DefaultLayout from '~/layouts/default.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('layouts/default.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = shallowMount(DefaultLayout, {
      localVue,
      methods: {
        localePath: (obj: object) => obj
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        Nuxt: true
      }
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      methods: {
        localePath: (obj: object) => obj
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        Nuxt: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
