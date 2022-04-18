import { mount, shallowMount } from '@vue/test-utils'

import { createVue, randomString } from '~/__tests__/utils'
import FlagComponent from '~/components/Flag.vue'

const localVue = createVue()

interface FlagProps {
  iso: string
  title?: string
  squared?: boolean
}

describe('components/Flag.vue', () => {
  let wrapper: ReturnType<typeof mount>
  const propsData: FlagProps = { iso: 'ja' }
  beforeEach(() => {
    wrapper = shallowMount(FlagComponent, { localVue, propsData })
  })

  describe('props', () => {
    test('sets { squared: false, title: null } default', () => {
      const expected = { ...propsData, squared: false, title: null }
      expect(wrapper.props()).toStrictEqual(expected)
    })
  })

  describe('class', () => {
    test.each([
      ['ja', 'fi-ja'],
      ['US', 'fi-us'],
      ['foo', 'fi-foo']
    ])('{ iso: "%s" } has "%s" class', async (iso, expectedClass) => {
      wrapper.setProps({ iso })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').classes()).toContain(expectedClass)
    })
    test('{ squared: true } has "fis" class', async () => {
      wrapper.setProps({ squared: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').classes()).toContain('fis')
    })
    test('{ squared: false } does not have "fis" class', async () => {
      wrapper.setProps({ squared: false })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').classes()).not.toContain('fis')
    })
  })

  describe('title attribute', () => {
    test('renders props.iso value if props.title is undefined', async () => {
      const iso = randomString(10)
      wrapper.setProps({ iso })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').attributes().title).toBe(iso)
    })
    test('renders props.title value', async () => {
      const title = randomString(10)
      const iso = randomString(10)
      wrapper.setProps({ title, iso })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').attributes().title).toBe(title)
    })
  })
})
