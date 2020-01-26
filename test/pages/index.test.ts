import { shallowMount, createLocalVue, Wrapper, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Index from '~/pages/index.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('pages/index.vue', () => {
  let wrapper: Wrapper<Vue>
  const $vxm = {
    counter: { count: 0 }
  }

  beforeEach(() => {
    wrapper = shallowMount(Index, { localVue, mocks: { $vxm } })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(Index, { localVue, mocks: { $vxm } })
    expect(wrapper.element).toMatchSnapshot()
  })
})
