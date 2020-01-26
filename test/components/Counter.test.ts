import { shallowMount, createLocalVue, Wrapper, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import { VuexTypeModule } from '~/store'
import CounterComponent from '~/components/Counter.vue'
import { CounterStore } from '~/store/counter'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('components/Counter.vue', () => {
  let wrapper: Wrapper<CounterComponent>
  let $vxm: VuexTypeModule

  beforeEach(() => {
    $vxm = {
      counter: new CounterStore()
    }
    wrapper = shallowMount(CounterComponent, { localVue, mocks: { $vxm } })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(CounterComponent, { localVue, mocks: { $vxm } })
    expect(wrapper.element).toMatchSnapshot()
  })

  test.each([0, 1, 2, 10])(
    'click plus button increases count',
    async (pressCount) => {
      // Arrange
      const wrapper = mount(CounterComponent, { localVue, mocks: { $vxm } })
      const button = wrapper.find('button.plus')

      // Act
      for (let i = 0; i < pressCount; i++) {
        button.trigger('click')
      }

      // Assert
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span.subtitle').text()).toBe(pressCount.toString())
    }
  )

  test.each([0, 1, 2, 10])(
    'click minus button decreases count',
    async (pressCount) => {
      // Arrange
      const wrapper = mount(CounterComponent, { localVue, mocks: { $vxm } })
      const button = wrapper.find('button.minus')

      // Act
      for (let i = 0; i < pressCount; i++) {
        button.trigger('click')
      }

      // Assert
      await wrapper.vm.$nextTick()
      expect(wrapper.find('span.subtitle').text()).toBe(
        (-pressCount).toString()
      )
    }
  )
})
