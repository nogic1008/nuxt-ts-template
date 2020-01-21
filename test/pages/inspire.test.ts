import { shallowMount, createLocalVue, Wrapper, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import Inspire from '~/pages/inspire.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('pages/inspire.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = shallowMount(Inspire, { localVue })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(Inspire, { localVue })
    expect(wrapper.element).toMatchSnapshot()
  })
})
