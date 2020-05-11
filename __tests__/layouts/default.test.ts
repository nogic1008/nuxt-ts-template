import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'

import DefaultLayout from '~/layouts/default.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('layouts/default.vue', () => {
  const methods = {
    localePath: (obj: object) => obj
  }

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
