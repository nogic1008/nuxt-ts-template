import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import Inspire from '~/pages/inspire.vue'

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

describe('pages/inspire.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = shallowMount(Inspire, { localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('snapshot', () => {
    test.each(['en', 'ja'])(
      'renders correctly if locale is "%s"',
      async (locale) => {
        const wrapper = mount(Inspire, { localVue })
        wrapper.vm.$i18n.locale = locale
        await localVue.nextTick()
        expect(wrapper.element).toMatchSnapshot()
      }
    )
  })

  describe('head()', () => {
    test.each([
      ['"Just start"', 'en'],
      ['"さあ、始めよう"', 'ja']
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
