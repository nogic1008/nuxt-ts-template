import { describe, expect, test } from '@jest/globals'
import { mount } from '@vue/test-utils'

import { createI18n, createVue } from '~/__tests__/utils'
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
})
