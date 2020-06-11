import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Buefy from 'buefy'

import Card from '~/components/Card.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('components/Card.vue', () => {
  let wrapper: ReturnType<typeof mount>
  const propsData = {
    title: 'title',
    icon: 'github-circle'
  }

  beforeEach(() => {
    wrapper = shallowMount(Card, { localVue, propsData })
  })

  test('renders correctly', () => {
    const wrapper = mount(Card, { localVue, propsData })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders props value', () => {
    expect(wrapper.find('.card-header-title').text()).toBe(propsData.title)
    expect(wrapper.find('b-icon-stub').attributes('icon')).toBe(propsData.icon)
  })
})
