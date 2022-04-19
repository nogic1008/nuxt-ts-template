import { describe, expect, test } from '@jest/globals'
import { mount, shallowMount } from '@vue/test-utils'

import { createI18n, createVue } from '~/__tests__/utils'
import pkg from '~/package.json'
import Index from '~/pages/index.vue'

const localVue = createVue()

describe('pages/index.vue', () => {
  describe.each(['en', 'ja'])(
    '{ locale: %s } snapshot test',
    (locale: string) => {
      const i18n = createI18n(locale)
      test('renders correctly', () => {
        const stubs = ['card', 'counter']
        const wrapper = mount(Index, { localVue, stubs, i18n })
        expect(wrapper.element).toMatchSnapshot()
      })
    }
  )

  describe('head()', () => {
    test(`returns { title: "${pkg.name}" }`, () => {
      // Arrange
      const i18n = createI18n()
      const wrapper = shallowMount(Index, { localVue, i18n })

      // Act
      const head = wrapper.vm.$options.head as Function
      const header = head.call(wrapper.vm)

      // Assert
      expect(header.title).toBe(pkg.name)
      expect(header.titleTemplate).toBe('')
    })
  })
})
