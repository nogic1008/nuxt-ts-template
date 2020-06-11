import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

import Environment from '~/pages/environment.vue'
import type { getClientEnvironments } from '~/plugins/environments'

type EnvironmentVariables = ReturnType<typeof getClientEnvironments>

const localVue = createLocalVue()
localVue.use(VueI18n)
const i18n = new VueI18n({ locale: 'en', silentFallbackWarn: true })

describe('pages/environment.vue', () => {
  let wrapper: ReturnType<typeof mount>
  const $environments: EnvironmentVariables = {
    BASE_PATH: 'foo'
  }

  beforeEach(() => {
    wrapper = shallowMount(Environment, {
      localVue,
      mocks: { $environments },
      i18n
    })
  })

  describe('snapshot', () => {
    test.each(['en', 'ja'])(
      'renders correctly if locale is "%s"',
      async (locale) => {
        const i18n = new VueI18n({ locale, silentFallbackWarn: true })
        const wrapper = mount(Environment, {
          localVue,
          mocks: { $environments },
          i18n
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
