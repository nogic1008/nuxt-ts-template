import { Context } from '@nuxt/types'

jest.mock('vuex')
jest.mock('~/store')

describe('plugins/vuex-module.ts', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('default export', () => {
    test('is typeof function', () => {
      // Arrange

      // Act
      const plugin = require('~/plugins/vuex-module').default

      // Assert
      expect(typeof plugin).toBe('function')
    })
    test('calls inject()', () => {
      // Arrange
      const inject = jest.fn()

      // Act
      require('~/plugins/vuex-module').default({} as Context, inject)

      // Assert
      expect(inject.mock.calls.length).toBe(1)
      expect(inject.mock.calls[0][0]).toBe('vxm')
    })
  })
})
