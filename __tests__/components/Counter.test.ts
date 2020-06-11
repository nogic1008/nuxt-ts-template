import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import CounterComponent from '~/components/Counter.vue'
import type { vxm } from '~/store'
import CounterStore from '~/store/counter'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)

describe('components/Counter.vue', () => {
  let $vxm: Record<keyof typeof vxm, object>

  beforeEach(() => {
    $vxm = {
      counter: new CounterStore()
    }
  })

  describe('snapshot', () => {
    test.each(['en', 'ja'])('renders correctly if locale is "%s"', (locale) => {
      const i18n = new VueI18n({ locale, silentFallbackWarn: true })
      const wrapper = mount(CounterComponent, {
        localVue,
        mocks: { $vxm },
        i18n
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  test.each([0, 1, 2, 10])(
    'click plus button increases count',
    async (pressCount) => {
      // Arrange
      const i18n = new VueI18n({ locale: 'en', silentFallbackWarn: true })
      const wrapper = mount(CounterComponent, {
        localVue,
        mocks: { $vxm },
        i18n
      })
      const button = wrapper.find('button.plus')

      // Act
      for (let i = 0; i < pressCount; i++) {
        button.trigger('click')
      }

      // Assert
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span.subtitle').text()).toBe(pressCount.toString())
    }
  )

  test.each([0, 1, 2, 10])(
    'click minus button decreases count',
    async (pressCount) => {
      // Arrange
      const i18n = new VueI18n({ locale: 'en', silentFallbackWarn: true })
      const wrapper = mount(CounterComponent, {
        localVue,
        mocks: { $vxm },
        i18n
      })
      const button = wrapper.find('button.minus')

      // Act
      for (let i = 0; i < pressCount; i++) {
        button.trigger('click')
      }

      // Assert
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span.subtitle').text()).toBe(
        (-pressCount).toString()
      )
    }
  )
})
