import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import Buefy from 'buefy'

import Card from '~/components/Card.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('components/Card.vue', () => {
  let wrapper: Wrapper<Vue>
  const props = {
    title: 'title',
    icon: 'github-circle'
  }

  beforeEach(() => {
    wrapper = shallowMount(Card, { localVue, propsData: { ...props } })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(Card, { localVue, propsData: { ...props } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders props value', () => {
    expect(wrapper.find('.card-header-title').text()).toBe(props.title)
    expect(wrapper.find('b-icon-stub').attributes('icon')).toBe(props.icon)
  })
})
