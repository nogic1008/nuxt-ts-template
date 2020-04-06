import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Buefy from 'nuxt-buefy/node_modules/buefy'
import VueI18n from 'vue-i18n'

import CounterComponent from '~/components/Counter.vue'
import type { vxm } from '~/store'
import CounterStore from '~/store/counter'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)
/* eslint-disable no-console */
const spyWarn = jest.spyOn(console, 'warn')
spyWarn.mockImplementation((message, params) => {
  if (
    typeof message === 'string' &&
    /^\[vue-i18n\] Cannot translate the value of keypath.+$/.test(message)
  )
    return
  console.log(message, params)
})
/* eslint-enable no-console */

describe('components/Counter.vue', () => {
  let wrapper: ReturnType<typeof mount>
  let $vxm: Record<keyof typeof vxm, object>

  beforeEach(async () => {
    $vxm = {
      counter: new CounterStore()
    }
    wrapper = shallowMount(CounterComponent, { localVue, mocks: { $vxm } })
    wrapper.vm.$i18n.locale = 'en'
    await localVue.nextTick()
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('snapshot', () => {
    test.each(['en', 'ja'])(
      'renders correctly if locale is "%s"',
      async (locale) => {
        const wrapper = mount(CounterComponent, { localVue, mocks: { $vxm } })
        wrapper.vm.$i18n.locale = locale
        await localVue.nextTick()
        expect(wrapper.element).toMatchSnapshot()
      }
    )
  })

  test.each([0, 1, 2, 10])(
    'click plus button increases count',
    async (pressCount) => {
      // Arrange
      const wrapper = mount(CounterComponent, { localVue, mocks: { $vxm } })
      wrapper.vm.$i18n.locale = 'en'
      await localVue.nextTick()
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
      const wrapper = mount(CounterComponent, { localVue, mocks: { $vxm } })
      wrapper.vm.$i18n.locale = 'en'
      await localVue.nextTick()
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
