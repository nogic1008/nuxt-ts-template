import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import FlagComponent from '~/components/Flag.vue'

import { randomString as random } from '../utils'

const localVue = createLocalVue()

type FlagProps = {
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

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(FlagComponent, {
      localVue,
      propsData: { ...propsData, title: 'Japan', squared: true }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('sets { squared: false, title: undefined } default', () => {
    expect(wrapper.props()).toStrictEqual({
      ...propsData,
      squared: false,
      title: undefined
    })
  })

  test.each([
    ['flag-icon-ja', 'ja'],
    ['flag-icon-us', 'US'],
    ['flag-icon-foo', 'Foo']
  ])('has %s class if iso is %s', async (expectedClass, iso) => {
    wrapper.setProps({ iso })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span').classes()).toContain(expectedClass)
  })

  test('has flag-icon-squared class if squared is true', async () => {
    wrapper.setProps({ squared: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span').classes()).toContain('flag-icon-squared')
  })

  test('has not flag-icon-squared class if squared is false', async () => {
    wrapper.setProps({ squared: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span').classes()).not.toContain('flag-icon-squared')
  })

  describe('title attribute', () => {
    test('equals iso prop if title is undefined', async () => {
      const randomString = random(10)
      wrapper.setProps({ iso: randomString })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').attributes().title).toBe(randomString)
    })
    test('equals title prop', async () => {
      const randomString = random(10)
      wrapper.setProps({ title: randomString })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span').attributes().title).toBe(randomString)
    })
  })
})
