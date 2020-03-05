/* eslint-disable no-process-env */
import { Context } from '@nuxt/types'

import {
  EnvironmentVariables,
  ServerEnvironmentVariables
} from '~/plugins/environments'
import { generateRandomString } from '~/utils/test-utils'

type AllEnvironmentVariables = EnvironmentVariables & ServerEnvironmentVariables
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
    const keys = new Set<keyof AllEnvironmentVariables>([
      'NODE_ENV',
      'BASE_PATH'
    ])
    keys.forEach((key) => delete process.env[key])
  })

  afterEach(() => {
    // restore process.env
    process.env = OLD_ENV
  })

  describe('environments', () => {
    test('eqauls process.env value', async () => {
      // Arrange
      const nodeEnvString = random(10)
      const basePath = `/${random(5)}/`
      process.env.NODE_ENV = nodeEnvString
      process.env.BASE_PATH = basePath

      // Act
      const env = (await import('~/plugins/environments')).environments

      // Assert
      expect(env.NODE_ENV).toBe(nodeEnvString)
      expect(env.BASE_PATH).toBe(basePath)
    })
    test('BASE_PATH is "/" default', async () => {
      // Arrange
      const nodeEnvString = random(10)
      process.env.NODE_ENV = nodeEnvString

      // Act
      const env = (await import('~/plugins/environments')).environments

      // Assert
      expect(env.BASE_PATH).toBe('/')
    })
    describe('validate()', () => {
      test('returns { valid: true } if be set process.env', async () => {
        // Arrange
        process.env.NODE_ENV = random(10)

        // Act
        const returnVal = (
          await import('~/plugins/environments')
        ).environments.validate()

        // Assert
        expect(returnVal.valid).toBe(true)
      })
      test.each([undefined, null])(
        'returns { valid: false, keys: [key] } if not set process.env',
        async (env) => {
          // Arrange
          process.env.NODE_ENV = env!

          // Act
          const returnVal = (
            await import('~/plugins/environments')
          ).environments.validate()

          // Assert
          expect(returnVal.valid).toBe(false)
          if (returnVal.valid) return
          expect(returnVal.keys).toContain<keyof AllEnvironmentVariables>(
            'NODE_ENV'
          )
        }
      )
    })
  })

  describe('default export', () => {
    test('is typeof function', async () => {
      // Arrange

      // Act
      const environmentPlugin = (await import('~/plugins/environments')).default

      // Assert
      expect(typeof environmentPlugin).toBe('function')
    })
    test('calls inject()', async () => {
      // Arrange
      const envObject: EnvironmentVariables = {
        BASE_PATH: `/${random(5)}/`
      }
      const serverEnv: AllEnvironmentVariables = {
        ...envObject,
        NODE_ENV: random(10),
        validate: jest.fn()
      }
      const inject = jest.fn()
      process.env.NODE_ENV = serverEnv.NODE_ENV
      process.env.BASE_PATH = serverEnv.BASE_PATH

      // Act
      const func = (await import('~/plugins/environments')).default
      func({} as Context, inject)

      // Assert
      expect(inject.mock.calls.length).toBe(1)
      expect(inject.mock.calls[0][0]).toBe('environments')
      expect(inject.mock.calls[0][1]).toStrictEqual(envObject)
    })
  })
})
