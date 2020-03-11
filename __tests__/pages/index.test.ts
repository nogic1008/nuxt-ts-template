import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'
import VueI18n from 'vue-i18n'

import Index from '~/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Buefy)
localVue.use(VueI18n)

describe('pages/index.vue', () => {
  let wrapper: Wrapper<Vue>
  const $vxm = {
    counter: { count: 0 }
  }

  beforeEach(async () => {
    wrapper = shallowMount(Index, { localVue, mocks: { $vxm } })
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
          mocks: { $vxm }
        })
        wrapper.vm.$i18n.locale = locale
        await localVue.nextTick()
        expect(wrapper.element).toMatchSnapshot()
      }
    )
  })
})
