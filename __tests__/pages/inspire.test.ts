import { mount, shallowMount } from '@vue/test-utils'

import { createI18n, createVue } from '~/__tests__/utils'
import Inspire from '~/pages/inspire.vue'

const localVue = createVue()

describe('pages/inspire.vue', () => {
  describe.each(['en', 'ja'])('{ locale: %s } snapshot test', (locale) => {
    const i18n = createI18n(locale)
    test('renders correctly', () => {
      const mocks = { $nuxt: { context: { app: { i18n } } } }
      const wrapper = mount(Inspire, { localVue, i18n, mocks })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('head()', () => {
    test.each([
      ['en', '"Just start"'],
      ['ja', '"さあ、始めよう"']
    ])('{ locale: %s } returns { title: "%s" }', (locale, title) => {
      // Arrange
      const i18n = createI18n(locale)
      const mocks = { $nuxt: { context: { app: { i18n } } } }
      const wrapper = shallowMount(Inspire, { localVue, i18n, mocks })

      // Act & Assert
      const head = wrapper.vm.$options.head as Function
      expect(head.call(wrapper.vm).title).toBe(title)
    })
  })
})
