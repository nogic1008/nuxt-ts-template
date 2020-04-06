import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Buefy from 'nuxt-buefy/node_modules/buefy'
import VueI18n from 'vue-i18n'

import Index from '~/pages/index.vue'

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

describe('pages/index.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    wrapper = shallowMount(Index, { localVue })
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
        const wrapper = mount(Index, {
          localVue,
          stubs: ['card', 'counter']
        })
        wrapper.vm.$i18n.locale = locale
        await localVue.nextTick()
        expect(wrapper.element).toMatchSnapshot()
      }
    )
  })
})
