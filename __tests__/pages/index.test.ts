import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import Index from '~/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)

describe('pages/index.vue', () => {
  describe.each(['en', 'ja'])('{ locale: %s } snapshot test', (locale) => {
    const i18n = new VueI18n({ locale, silentFallbackWarn: true })
    test('renders correctly', () => {
      const stubs = ['card', 'counter']
      const wrapper = mount(Index, { localVue, stubs, i18n })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
