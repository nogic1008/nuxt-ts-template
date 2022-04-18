import { mount } from '@vue/test-utils'

import { createVue } from '~/__tests__/utils'
import Card from '~/components/Card.vue'

const localVue = createVue()

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
