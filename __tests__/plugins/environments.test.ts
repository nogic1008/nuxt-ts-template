import { Context } from '@nuxt/types'

import type {
  environments,
  getClientEnvironments
} from '~/plugins/environments'

import ProcessEnvProvider from '../env-provider'
import { randomString as random } from '../utils'

type EnvironmentVariables = ReturnType<typeof getClientEnvironments>
type AllEnvironmentVariables = Omit<typeof environments, 'validate'>
// mock 'dotenv' to avoid change process.env
jest.mock('dotenv')

describe('plugins/environments.ts', () => {
  const provider = new ProcessEnvProvider<AllEnvironmentVariables>(
    'BASE_PATH',
    'NODE_ENV'
  )

  beforeEach(() => {
    jest.resetModules()
    provider.initialize()
  })
  afterEach(() => {
    provider.restore()
  })

  describe('environments', () => {
    test('eqauls process.env value', async () => {
      // Arrange
      const expected: AllEnvironmentVariables = {
        BASE_PATH: `/${random(5)}/`,
        NODE_ENV: random(10)
      }
      provider.initialize(expected)

      // Act
      const env = (await import('~/plugins/environments')).environments

      // Assert
      expect(env.NODE_ENV).toBe(expected.NODE_ENV)
      expect(env.BASE_PATH).toBe(expected.BASE_PATH)
    })
    test('BASE_PATH is "/" default', async () => {
      // Arrange
      provider.initialize({ NODE_ENV: random(10) })

      // Act
      const env = (await import('~/plugins/environments')).environments

      // Assert
      expect(env.BASE_PATH).toBe('/')
    })
    describe('validate()', () => {
      test('returns { valid: true } if be set process.env', async () => {
        // Arrange
        provider.initialize({ NODE_ENV: random(10) })

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
          provider.initialize({ NODE_ENV: env! })

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
        NODE_ENV: random(10)
      }
      provider.initialize(serverEnv)
      const inject: jest.Mock<void, [string, any]> = jest.fn()

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
