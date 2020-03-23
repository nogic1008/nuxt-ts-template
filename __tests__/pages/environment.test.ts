import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

import Environment from '~/pages/environment.vue'
import type { getClientEnvironments } from '~/plugins/environments'

type EnvironmentVariables = ReturnType<typeof getClientEnvironments>

const localVue = createLocalVue()
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

describe('pages/environment.vue', () => {
  let wrapper: Wrapper<Vue>
  const $environments: EnvironmentVariables = {
    BASE_PATH: 'foo'
  }

  beforeEach(async () => {
    wrapper = shallowMount(Environment, {
      localVue,
      mocks: { $environments }
    })
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
        const wrapper = mount(Environment, {
          localVue,
          mocks: { $environments }
        })
        wrapper.vm.$i18n.locale = locale
        await localVue.nextTick()
        expect(wrapper.element).toMatchSnapshot()
      }
    )
  })

  describe('head()', () => {
    test.each([
      ['Client-side Environments', 'en'],
      ['クライアントサイド 環境変数', 'ja']
    ])('returns "%s" if locale is "%s"', async (expected, locale) => {
      // Arrange
      wrapper.vm.$i18n.locale = locale
      await localVue.nextTick()
      const head = wrapper.vm.$options.head as Function

      // Act & Assert
      expect(head.call(wrapper.vm)).toStrictEqual({ title: expected })
    })
  })
})
