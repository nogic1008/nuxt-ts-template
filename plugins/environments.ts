import { Plugin } from '@nuxt/types'
import { config } from 'dotenv'

config()

/** Environment values used on client-side and server-side. */
export type EnvironmentVariables = {
  /** The base URL of the app.
   * @description if the entire single page application is served under /app/,
   * then base should use the value '/app/'
   * @default '/'
   * @see https://nuxtjs.org/api/configuration-router/#base
   */
  BASE_PATH: string
}

/** Environment values used on only server-side. */
export type ServerEnvironmentVariables = {
  NODE_ENV: string
  /** Validate environments values. */
  validate: () =>
    | { valid: true }
    | {
        valid: false
        keys: Extract<keyof AllEnvironmentVariables, string>[]
      }
}

type AllEnvironmentVariables = EnvironmentVariables & ServerEnvironmentVariables

/* eslint-disable no-process-env */
export const environments: AllEnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!,
  BASE_PATH: process.env.BASE_PATH || '/',
  validate() {
    const invalidKeys: string[] = Object.keys(this).filter((key) => {
      const value: unknown = (this as any)[key]
      return value === undefined || value === null
    })
    return invalidKeys.length === 0
      ? { valid: true }
      : {
          valid: false,
          keys: invalidKeys as Extract<keyof AllEnvironmentVariables, string>[]
        }
  }
}
/* eslint-enable no-process-env */

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

/** Create environment values used on only client-side. */
export const createClientEnvironments = (): EnvironmentVariables => {
  const clientEnvironments = { ...environments }
  const keys: Extract<keyof ServerEnvironmentVariables, string>[] = [
    'NODE_ENV',
    'validate'
  ]
  keys.forEach((key) => delete clientEnvironments[key])
  return clientEnvironments
}

const environmentsPlugin: Plugin = (_, inject) => {
  const env = createClientEnvironments()
  inject('environments', env)
}

export default environmentsPlugin
