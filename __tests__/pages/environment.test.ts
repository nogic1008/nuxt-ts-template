import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

import Environment from '~/pages/environment.vue'

const localVue = createLocalVue()
localVue.use(VueI18n)

describe('pages/environment.vue', () => {
  const $config = { basePath: 'foo' }
  describe.each(['en', 'ja'])('{ locale: %s } snapshot test', (locale) => {
    const i18n = new VueI18n({ locale, silentFallbackWarn: true })

    test('renders correctly', () => {
      const mocks = {
        $nuxt: { context: { $config, app: { i18n } } }
      }
      const wrapper = mount(Environment, { localVue, mocks, i18n })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('head()', () => {
    test.each([
      ['en', 'Client-side Environments'],
      ['ja', 'クライアントサイド 環境変数']
    ])('{ locale: %s } returns { title: "%s" }', (locale, title) => {
      // Arrange
      const i18n = new VueI18n({ locale, silentFallbackWarn: true })
      const mocks = {
        $nuxt: { context: { $config: { basePath: 'foo' }, app: { i18n } } }
      }
      const wrapper = shallowMount(Environment, { localVue, mocks, i18n })

      // Act & Assert
      const head = wrapper.vm.$options.head as Function
      expect(head.call(wrapper.vm).title).toBe(title)
    })
  })
})
