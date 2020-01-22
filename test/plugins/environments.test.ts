/* eslint-disable no-process-env */
import { Context } from '@nuxt/types'
import { generateRandomString, nameof } from '@/test/test-utils'
import { EnvironmentVariables } from '@/plugins/environments'

describe('plugins/environments.ts', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    // clear cache
    jest.resetModules()

    // load process.env except used for testing
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    // restore process.env
    process.env = OLD_ENV
  })

  describe('environments', () => {
    test('eqauls process.env value', () => {
      // Arrange
      const randomString = generateRandomString(10)
      process.env.NODE_ENV = randomString

      // Act
      const env = require('@/plugins/environments')
        .environments as EnvironmentVariables

      // Assert
      expect(env.NODE_ENV).toBe(randomString)
    })
  })

  describe('validateEnvironments()', () => {
    test('returns { valid: true } if be set process.env', () => {
      // Arrange
      process.env.NODE_ENV = generateRandomString(10)

      // Act
      const returnVal = require('@/plugins/environments').validateEnvironments() as {
        valid: boolean
      }

      // Assert
      expect(returnVal.valid).toBe(true)
    })
    test('returns { valid: false, keys: [key] } if not set process.env', () => {
      // Arrange

      // Act
      const returnVal = require('@/plugins/environments').validateEnvironments() as {
        valid: boolean
        keys: string[]
      }

      // Assert
      expect(returnVal.valid).toBe(false)
      expect(returnVal.keys).toContain(nameof<EnvironmentVariables>('NODE_ENV'))
    })
  })

  describe('default export', () => {
    test('is typeof function', () => {
      // Arrange

      // Act
      const environmentPlugin = require('@/plugins/environments').default

      // Assert
      expect(typeof environmentPlugin).toBe('function')
    })
    test('calls inject()', () => {
      // Arrange
      const envObject: EnvironmentVariables = {
        NODE_ENV: generateRandomString(10)
      }
      const inject = jest.fn()

      // Act
      process.env.NODE_ENV = envObject.NODE_ENV
      require('@/plugins/environments').default({} as Context, inject)

      // Assert
      expect(inject.mock.calls.length).toBe(1)
      expect(inject.mock.calls[0]).toContain('environments')
      expect(inject.mock.calls[0]).toContainEqual(envObject)
    })
  })
})
