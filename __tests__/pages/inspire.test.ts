import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import Inspire from '~/pages/inspire.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)

describe('pages/inspire.vue', () => {
  describe.each(['en', 'ja'])('{ locale: %s } snapshot test', (locale) => {
    const i18n = new VueI18n({ locale, silentFallbackWarn: true })
    test('renders correctly', () => {
      const mocks = { $nuxt: { context: { i18n } } }
      const wrapper = mount(Inspire, { localVue, i18n, mocks })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
