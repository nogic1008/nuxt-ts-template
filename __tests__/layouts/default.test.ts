import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'

import DefaultLayout from '~/layouts/default.vue'

import { i18nMethods } from '../utils'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.mixin(i18nMethods)

describe('layouts/default.vue', () => {
  test('renders correctly', () => {
    const stubs = { NuxtLink: RouterLinkStub, Nuxt: true, Navbar: true }
    const wrapper = mount(DefaultLayout, { localVue, stubs })
    expect(wrapper.element).toMatchSnapshot()
  })
})
