import { describe, expect, test } from '@jest/globals'
import { mount, shallowMount } from '@vue/test-utils'

import { createI18n, createVue } from '~/__tests__/utils'
import Environment from '~/pages/environment.vue'

const localVue = createVue()

describe('pages/environment.vue', () => {
  const $config = { basePath: 'foo' }
  describe.each(['en', 'ja'])(
    '{ locale: %s } snapshot test',
    (locale: string) => {
      const i18n = createI18n(locale)

      test('renders correctly', () => {
        const mocks = {
          $nuxt: { context: { $config, app: { i18n } } }
        }
        const wrapper = mount(Environment, { localVue, mocks, i18n })
        expect(wrapper.element).toMatchSnapshot()
      })
    }
  )

  describe('head()', () => {
    test.each([
      ['en', 'Client-side Environments'],
      ['ja', 'クライアントサイド 環境変数']
    ])(
      '{ locale: %s } returns { title: "%s" }',
      (locale: string, title: string) => {
        // Arrange
        const i18n = createI18n(locale)
        const mocks = {
          $nuxt: { context: { $config: { basePath: 'foo' }, app: { i18n } } }
        }
        const wrapper = shallowMount(Environment, { localVue, mocks, i18n })

        // Act & Assert
        const head = wrapper.vm.$options.head as Function
        expect(head.call(wrapper.vm).title).toBe(title)
      }
    )
  })
})
