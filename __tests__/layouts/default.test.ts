import { mount, RouterLinkStub } from '@vue/test-utils'

import { createVue } from '~/__tests__/utils'
import DefaultLayout from '~/layouts/default.vue'

const localVue = createVue()

describe('layouts/default.vue', () => {
  test('renders correctly', () => {
    const stubs = { NuxtLink: RouterLinkStub, Nuxt: true, Navbar: true }
    const wrapper = mount(DefaultLayout, { localVue, stubs })
    expect(wrapper.element).toMatchSnapshot()
  })
})
