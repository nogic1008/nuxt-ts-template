import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'

import { createI18n, createVue } from '~/__tests__/utils'
import CounterComponent from '~/components/Counter.vue'
import useCounter from '~/composables/useCounter'

jest.mock('~/composables/useCounter')

const localVue = createVue()

describe('components/Counter.vue', () => {
  const increment = jest.fn()
  const decrement = jest.fn()
  const i18n = createI18n()
  beforeEach(() => {
    jest
      .mocked(useCounter)
      .mockReturnValue({ count: ref(0), increment, decrement })
    increment.mockClear()
    decrement.mockClear()
  })

  describe.each(['en', 'ja'])('snapshot test (%s)', (locale: string) => {
    test('renders correctly', () => {
      // Arrange
      const i18n = createI18n(locale)

      // Act
      const wrapper = mount(CounterComponent, { localVue, i18n })

      // Assert
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  test.each([1, 2, 10])(
    'click plus button calls useCounter().increment()',
    async (pressCount: number) => {
      // Arrange
      const wrapper = mount(CounterComponent, { localVue, i18n })

      // Act
      const button = wrapper.find('button.plus')
      for (let i = 0; i < pressCount; i++) {
        await button.trigger('click')
      }

      // Assert
      expect(increment).toBeCalledTimes(pressCount)
      expect(decrement).not.toBeCalled()
    }
  )

  test.each([1, 2, 10])(
    'click minus button calls useCounter().decrement()',
    async (pressCount: number) => {
      // Arrange
      const wrapper = mount(CounterComponent, { localVue, i18n })

      // Act
      const button = wrapper.find('button.minus')
      for (let i = 0; i < pressCount; i++) {
        await button.trigger('click')
      }

      // Assert
      expect(decrement).toBeCalledTimes(pressCount)
      expect(increment).not.toBeCalled()
    }
  )
})
