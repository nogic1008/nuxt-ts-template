import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { mount } from '@vue/test-utils'

import { createI18n, createVue } from '~/__tests__/utils'
import CounterComponent from '~/components/Counter.vue'

const localVue = createVue()

describe('components/Counter.vue', () => {
  const counter = { count: 0, increment: jest.fn(), decrement: jest.fn() }
  const i18n = createI18n()
  beforeEach(() => {
    counter.increment.mockClear()
    counter.decrement.mockClear()
  })

  describe.each(['en', 'ja'])('snapshot test (%s)', (locale: string) => {
    test('renders correctly', () => {
      // Arrange
      const i18n = createI18n(locale)
      const mocks = { $accessor: { counter } }

      // Act
      const wrapper = mount(CounterComponent, { localVue, mocks, i18n })

      // Assert
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  test.each([1, 2, 10])(
    'click plus button calls counter.increment()',
    async (pressCount: number) => {
      // Arrange
      const mocks = { $accessor: { counter } }
      const wrapper = mount(CounterComponent, { localVue, mocks, i18n })

      // Act
      const button = wrapper.find('button.plus')
      for (let i = 0; i < pressCount; i++) {
        await button.trigger('click')
      }

      // Assert
      expect(counter.increment).toBeCalledTimes(pressCount)
      expect(counter.decrement).not.toBeCalled()
    }
  )

  test.each([1, 2, 10])(
    'click minus button calls counter.decrement()',
    async (pressCount: number) => {
      // Arrange
      const mocks = { $accessor: { counter } }
      const wrapper = mount(CounterComponent, { localVue, mocks, i18n })

      // Act
      const button = wrapper.find('button.minus')
      for (let i = 0; i < pressCount; i++) {
        await button.trigger('click')
      }

      // Assert
      expect(counter.decrement).toBeCalledTimes(pressCount)
      expect(counter.increment).not.toBeCalled()
    }
  )
})
