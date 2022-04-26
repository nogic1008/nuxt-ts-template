import { describe, expect, test } from '@jest/globals'
import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils'
import type { IVueI18n } from 'vue-i18n'

import { createVue } from '~/__tests__/utils'
import NavbarComponent from '~/components/Navbar.vue'

const localVue = createVue()

describe('components/Navbar.vue', () => {
  const stubs = { NuxtLink: RouterLinkStub, Flag: true }
  const i18n: Partial<IVueI18n> = {
    locale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', flag: 'us', name: 'English' },
      { code: 'ja', iso: 'ja-JP', flag: 'jp', name: '日本語' }
    ]
  }

  test.each([true, false])(
    '{ isOpened: %p } renders correctly',
    (isOpened: boolean) => {
      const mocks = { $nuxt: { context: { i18n } } }
      const data = () => ({ isOpened })
      const wrapper = mount(NavbarComponent, { localVue, mocks, stubs, data })
      expect(wrapper.element).toMatchSnapshot()
    }
  )

  // Event
  describe('click navbar-barger', () => {
    test.each([
      [true, false],
      [false, true]
    ])(
      'changes { isOpened: %p } to %p',
      async (isOpened: boolean, expected: boolean) => {
        // Arrange
        const mocks = { $nuxt: { context: { i18n } } }
        const wrapper = shallowMount(NavbarComponent, {
          localVue,
          mocks,
          stubs
        })
        await wrapper.setData({ isOpened })

        // Act
        await wrapper.find('.navbar-burger').trigger('click')

        // Assert
        expect(wrapper.vm.$data.isOpened).toBe(expected)
      }
    )
  })
})
