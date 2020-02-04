import { shallowMount, createLocalVue, Wrapper, mount } from '@vue/test-utils'
import Environment from '~/pages/environment.vue'
import { EnvironmentVariables } from '~/plugins/environments'

const localVue = createLocalVue()

describe('pages/environment.vue', () => {
  let wrapper: Wrapper<Vue>
  const $environments: EnvironmentVariables = {
    BASE_PATH: 'foo',
    NODE_ENV: 'bar'
  }

  beforeEach(() => {
    wrapper = shallowMount(Environment, { localVue, mocks: { $environments } })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders correctly', () => {
    const wrapper = mount(Environment, { localVue, mocks: { $environments } })
    expect(wrapper.element).toMatchSnapshot()
  })
})
