import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'

import Card from '~/components/Card.vue'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('components/Card.vue', () => {
  const propsData = {
    title: 'title',
    icon: 'github-circle'
  }

  test('renders correctly', () => {
    const wrapper = mount(Card, { localVue, propsData })
    expect(wrapper.element).toMatchSnapshot()
  })
})
