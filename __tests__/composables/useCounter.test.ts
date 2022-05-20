import { beforeAll, describe, expect, jest, test } from '@jest/globals'
import VueCompositionApi, { ref } from '@vue/composition-api'
import Vue from 'vue'

import { useState } from '#app'
import useCounter from '~/composables/useCounter'

describe('composables/useCounter.ts', () => {
  beforeAll(() => {
    Vue.use(VueCompositionApi)
    jest.mocked(useState).mockReturnValue(ref(0))
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
