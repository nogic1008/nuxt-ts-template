import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import Index from '~/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)

describe('pages/index.vue', () => {
  describe('snapshot', () => {
    test.each(['en', 'ja'])('renders correctly if locale is "%s"', (locale) => {
      const i18n = new VueI18n({ locale, silentFallbackWarn: true })
      const wrapper = mount(Index, {
        localVue,
        stubs: ['card', 'counter'],
        i18n
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
