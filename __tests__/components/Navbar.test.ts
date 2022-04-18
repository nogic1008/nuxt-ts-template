import { mount, RouterLinkStub } from '@vue/test-utils'
import type { IVueI18n } from 'vue-i18n'

import { createVue } from '~/__tests__/utils'
import NavbarComponent from '~/components/Navbar.vue'

const localVue = createVue()

describe('components/Navbar.vue', () => {
  const i18n: Partial<IVueI18n> = {
    locale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', flag: 'us', name: 'English' },
      { code: 'ja', iso: 'ja-JP', flag: 'jp', name: '日本語' }
    ]
  }

  test('renders correctly', () => {
    const mocks = { $nuxt: { context: { i18n } } }
    const stubs = { NuxtLink: RouterLinkStub, Nuxt: true }
    const wrapper = mount(NavbarComponent, { localVue, mocks, stubs })
    expect(wrapper.element).toMatchSnapshot()
  })
})
