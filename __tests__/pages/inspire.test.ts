import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import Inspire from '~/pages/inspire.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)
const i18n = new VueI18n({ locale: 'en', silentFallbackWarn: true })

describe('pages/inspire.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = shallowMount(Inspire, { localVue, i18n })
  })

  describe('snapshot', () => {
    test.each(['en', 'ja'])('renders correctly if locale is "%s"', (locale) => {
      const i18n = new VueI18n({ locale, silentFallbackWarn: true })
      const wrapper = mount(Inspire, { localVue, i18n })
      expect(wrapper.element).toMatchSnapshot()
    })
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
