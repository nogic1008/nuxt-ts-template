import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'

import DefaultLayout from '~/layouts/default.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.mixin({
  methods: { localePath: (obj: object) => obj }
})

describe('layouts/default.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
        Nuxt: true,
        Navbar: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
