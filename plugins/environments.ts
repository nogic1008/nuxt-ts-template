import { Plugin } from '@nuxt/types'
import { config } from 'dotenv'

config()

/** Environment values used on client-side and server-side. */
type EnvironmentVariables = {
  /** The base URL of the app.
   * @description if the entire single page application is served under /app/,
   * then base should use the value '/app/'
   * @default '/'
   * @see https://nuxtjs.org/api/configuration-router/#base
   */
  BASE_PATH: string
}

/** Environment values used on only server-side. */
type ServerEnvironmentVariables = {
  NODE_ENV: string
  /** Validate environments values. */
  validate: () =>
    | { valid: true }
    | {
        valid: false
        keys: (keyof AllEnvironmentVariables)[]
      }
}

type AllEnvironmentVariables = EnvironmentVariables & ServerEnvironmentVariables

/* eslint-disable no-process-env */
export const environments: AllEnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!,
  BASE_PATH: process.env.BASE_PATH || '/',
  validate() {
    const invalidKeys: string[] = Object.entries(this)
      .filter((v) => v[1] === undefined || v[1] === null)
      .map((v) => v[0])
    return invalidKeys.length === 0
      ? { valid: true }
      : {
          valid: false,
          keys: invalidKeys as (keyof AllEnvironmentVariables)[]
        }
  }
}
/* eslint-enable no-process-env */

/** Create environment values used on only client-side. */
export const getClientEnvironments = (): EnvironmentVariables => {
  const clientEnvironments = { ...environments }
  const keys = new Set<keyof ServerEnvironmentVariables>([
    'NODE_ENV',
    'validate'
  ])
  keys.forEach((key) => delete clientEnvironments[key])
  return clientEnvironments
}

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

const environmentsPlugin: Plugin = (_, inject) => {
  const env = getClientEnvironments()
  inject('environments', env)
}

export default environmentsPlugin
