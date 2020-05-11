import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import Buefy from 'buefy'
import { IVueI18n } from 'vue-i18n'

import NavbarComponent from '~/components/Navbar.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('components/Navbar.vue', () => {
  const methods = {
    localePath: (obj: object) => obj,
    switchLocalePath: (code: string) => code
  }
  const $i18n: Partial<IVueI18n> = {
    locale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', flag: 'us', name: 'English' },
      { code: 'ja', iso: 'ja-JP', flag: 'jp', name: '日本語' }
    ]
  }

  test('renders correctly', () => {
    const wrapper = mount(NavbarComponent, {
      localVue,
      mocks: { $i18n },
      methods,
      stubs: {
        NuxtLink: RouterLinkStub,
        Nuxt: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
