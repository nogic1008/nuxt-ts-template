import { createLocalVue, mount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

import Environment from '~/pages/environment.vue'

const localVue = createLocalVue()
localVue.use(VueI18n)

describe('pages/environment.vue', () => {
  describe.each(['en', 'ja'])('{ locale: %s } snapshot test', (locale) => {
    const i18n = new VueI18n({ locale, silentFallbackWarn: true })

    test('renders correctly', () => {
      const mocks = { $nuxt: { context: { $config: { basePath: 'foo' }, i18n } } }
      const wrapper = mount(Environment, { localVue, mocks, i18n })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
