import { Context } from '@nuxt/types'

jest.mock('vuex')
jest.mock('~/store')

describe('plugins/vuex-module.ts', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('default export', () => {
    test('is typeof function', async () => {
      // Arrange
      // Act
      const plugin = (await import('~/plugins/vuex-module')).default

      // Assert
      expect(typeof plugin).toBe('function')
    })
    test('calls inject()', async () => {
      // Arrange
      const vxm = { foo: 'bar' }
      jest.mock('~/store', () => ({ vxm }))
      const inject: jest.Mock<void, [string, any]> = jest.fn()
      const func = (await import('~/plugins/vuex-module')).default

      // Act
      func({} as Context, inject)

      // Assert
      expect(inject.mock.calls.length).toBe(1)
      expect(inject.mock.calls[0][0]).toBe('vxm')
      expect(inject.mock.calls[0][1]).toStrictEqual(vxm)
    })
  })
})
