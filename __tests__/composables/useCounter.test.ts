import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue'

import useCounter from '~/composables/useCounter'

describe('composables/useCounter.ts', () => {
  beforeAll(() => {
    Vue.use(VueCompositionApi)
  })

  test('.count returns 0', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })
  test('.increment() sets .count to +1', () => {
    const { count, increment } = useCounter()
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })
  test('.decrement() sets .count to -1', () => {
    const { count, decrement } = useCounter()
    expect(count.value).toBe(0)
    decrement()
    expect(count.value).toBe(-1)
  })
})
