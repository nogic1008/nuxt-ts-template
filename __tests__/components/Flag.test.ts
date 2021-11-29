import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import FlagComponent from '~/components/Flag.vue'

import { randomString as random } from '../utils'

const localVue = createLocalVue()

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
      ['ja', 'flag-icon-ja'],
      ['US', 'flag-icon-us'],
      ['foo', 'flag-icon-foo']
    ])('{ iso: "%s" } has "%s" class', async (iso, expectedClass) => {
      wrapper.setProps({ iso })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').classes()).toContain(expectedClass)
    })
    test('{ squared: true } has "flag-icon-squared" class', async () => {
      wrapper.setProps({ squared: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').classes()).toContain('flag-icon-squared')
    })
    test('{ squared: false } does not have "flag-icon-squared" class', async () => {
      wrapper.setProps({ squared: false })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').classes()).not.toContain('flag-icon-squared')
    })
  })

  describe('title attribute', () => {
    test('renders props.iso value if props.title is undefined', async () => {
      const iso = random(10)
      wrapper.setProps({ iso })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').attributes().title).toBe(iso)
    })
    test('renders props.title value', async () => {
      const title = random(10)
      const iso = random(10)
      wrapper.setProps({ title, iso })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').attributes().title).toBe(title)
    })
  })
})
