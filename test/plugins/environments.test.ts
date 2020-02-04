/* eslint-disable no-process-env */
import { Context } from '@nuxt/types'
import { generateRandomString } from '~/test/test-utils'
import { EnvironmentVariables } from '~/plugins/environments'

// mock 'dotenv' to avoid change process.env
jest.mock('dotenv')

describe('plugins/environments.ts', () => {
  const OLD_ENV = process.env
  const random = (count: number) => generateRandomString(count)

  beforeEach(() => {
    // clear cache
    jest.resetModules()

    // load process.env except used for testing
    process.env = { ...OLD_ENV }
    const keys: Extract<keyof EnvironmentVariables, string>[] = [
      'NODE_ENV',
      'BASE_PATH'
    ]
    keys.forEach((key) => delete process.env[key])
  })

  afterEach(() => {
    // restore process.env
    process.env = OLD_ENV
  })

  describe('environments', () => {
    test('eqauls process.env value', () => {
      // Arrange
      const nodeEnvString = random(10)
      const basePath = `/${random(5)}/`
      process.env.NODE_ENV = nodeEnvString
      process.env.BASE_PATH = basePath

      // Act
      const env = require('~/plugins/environments')
        .environments as EnvironmentVariables

      // Assert
      expect(env.NODE_ENV).toBe(nodeEnvString)
      expect(env.BASE_PATH).toBe(basePath)
    })
    test('BASE_PATH is "/" default', () => {
      // Arrange
      const nodeEnvString = random(10)
      process.env.NODE_ENV = nodeEnvString

      // Act
      const env = require('~/plugins/environments')
        .environments as EnvironmentVariables

      // Assert
      expect(env.BASE_PATH).toBe('/')
    })
    describe('validate()', () => {
      test('returns { valid: true } if be set process.env', () => {
        // Arrange
        process.env.NODE_ENV = random(10)

        // Act
        const returnVal = require('~/plugins/environments').environments.validate() as {
          valid: boolean
        }

        // Assert
        expect(returnVal.valid).toBe(true)
      })
      test.each([undefined, null])(
        'returns { valid: false, keys: [key] } if not set process.env',
        (env) => {
          // Arrange
          process.env.NODE_ENV = env!

          // Act
          const returnVal = require('~/plugins/environments').environments.validate() as {
            valid: boolean
            keys: Extract<keyof EnvironmentVariables, string>[]
          }

          // Assert
          expect(returnVal.valid).toBe(false)
          expect(returnVal.keys).toContain<keyof EnvironmentVariables>(
            'NODE_ENV'
          )
        }
      )
    })
  })

  describe('default export', () => {
    test('is typeof function', () => {
      // Arrange

      // Act
      const environmentPlugin = require('~/plugins/environments').default

      // Assert
      expect(typeof environmentPlugin).toBe('function')
    })
    test('calls inject()', () => {
      // Arrange
      const envObject: EnvironmentVariables = {
        NODE_ENV: random(10),
        BASE_PATH: `/${random(5)}/`
      }
      const inject = jest.fn()

      // Act
      process.env.NODE_ENV = envObject.NODE_ENV
      process.env.BASE_PATH = envObject.BASE_PATH
      require('~/plugins/environments').default({} as Context, inject)

      // Assert
      expect(inject.mock.calls.length).toBe(1)
      expect(inject.mock.calls[0][0]).toBe('environments')
      expect(inject.mock.calls[0][1]).toStrictEqual(envObject)
    })
  })
})
