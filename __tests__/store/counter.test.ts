import { CounterStore } from '~/store/counter'

describe('store/counter.ts', () => {
  let store: CounterStore
  beforeEach(() => {
    store = new CounterStore()
  })

  test('count is initialized 0', () => {
    expect(store.count).toBe(0)
  })

  test.each([1, 2, 10])('increment() causes +1 count', (repeatCount) => {
    for (let i = 0; i < repeatCount; i++) {
      store.increment()
    }
    expect(store.count).toBe(0 + repeatCount)
  })

  test.each([1, 2, 10])('decrement() causes -1 count', (repeatCount) => {
    for (let i = 0; i < repeatCount; i++) {
      store.decrement()
    }
    expect(store.count).toBe(0 - repeatCount)
  })
})
