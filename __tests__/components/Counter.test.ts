import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import CounterComponent from '~/components/Counter.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)

describe('components/Counter.vue', () => {
  const counter = { count: 0, increment: jest.fn(), decrement: jest.fn() }
  const i18n = new VueI18n({ locale: 'en', silentFallbackWarn: true })
  beforeEach(() => {
    counter.increment.mockClear()
    counter.decrement.mockClear()
  })

  describe.each(['en', 'ja'])('snapshot test (%s)', (locale) => {
    test('renders correctly', () => {
      // Arrange
      const i18n = new VueI18n({ locale, silentFallbackWarn: true })
      const mocks = { $accessor: { counter } }

      // Act
      const wrapper = mount(CounterComponent, { localVue, mocks, i18n })

      // Assert
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  test.each([1, 2, 10])(
    'click plus button calls counter.increment()',
    (pressCount) => {
      // Arrange
      const mocks = { $accessor: { counter } }
      const wrapper = mount(CounterComponent, { localVue, mocks, i18n })

      // Act
      const button = wrapper.find('button.plus')
      for (let i = 0; i < pressCount; i++) {
        button.trigger('click')
      }

      // Assert
      expect(counter.increment).toBeCalledTimes(pressCount)
      expect(counter.decrement).not.toBeCalled()
    }
  )

  test.each([1, 2, 10])(
    'click minus button calls counter.decrement()',
    (pressCount) => {
      // Arrange
      const mocks = { $accessor: { counter } }
      const wrapper = mount(CounterComponent, { localVue, mocks, i18n })

      // Act
      const button = wrapper.find('button.minus')
      for (let i = 0; i < pressCount; i++) {
        button.trigger('click')
      }

      // Assert
      expect(counter.decrement).toBeCalledTimes(pressCount)
      expect(counter.increment).not.toBeCalled()
    }
  )
})
