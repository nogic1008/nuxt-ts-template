import { getters, mutations, state } from '~/store/counter'

describe('store/counter.ts', () => {
  describe('state', () => {
    test('returns { count: 0 }', () => {
      expect(state()).toStrictEqual({ count: 0 })
    })
  })

  describe('getters', () => {
    describe('count', () => {
      test.each([0, -0, 1, -1, NaN, Infinity, -Infinity])(
        '({ count: %n }) returns param.count',
        (count) => {
          expect(getters.count({ count })).toBe(count)
        }
      )
    })
  })

  describe('mutations', () => {
    describe('increment', () => {
      test.each([
        [0, 1],
        [-1, 0],
        [1, 2]
      ])('({ count: %n }) changes obj to { count: %n }', (count, expected) => {
        // Arrenge
        const state = { count }

        // Act
        mutations.increment(state)

        // Assert
        expect(state.count).toBe(expected)
      })
    })
    describe('decrement', () => {
      test.each([
        [0, -1],
        [-1, -2],
        [1, 0]
      ])('({ count: %n }) changes obj to { count: %n }', (count, expected) => {
        // Arrenge
        const state = { count }

        // Act
        mutations.decrement(state)

        // Assert
        expect(state.count).toBe(expected)
      })
    })
  })
})
