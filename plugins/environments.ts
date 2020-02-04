import { Plugin } from '@nuxt/types'
import { config } from 'dotenv'

config()

export type EnvironmentVariables = {
  NODE_ENV: string
  /** The base URL of the app.
   * @description if the entire single page application is served under /app/,
   * then base should use the value '/app/'
   * @default '/'
   * @see https://nuxtjs.org/api/configuration-router/#base
   */
  BASE_PATH: string
}

/* eslint-disable no-process-env */
export const environments: EnvironmentVariables & {
  validate: () =>
    | { valid: true }
    | { valid: false; keys: Extract<keyof EnvironmentVariables, string>[] }
} = {
  NODE_ENV: process.env.NODE_ENV!,
  BASE_PATH: process.env.BASE_PATH || '/',
  /** Validate environments values. */
  validate() {
    const invalidKeys: string[] = Object.keys(this).filter((key) => {
      if (key === 'validate') return false
      const value: unknown = (this as any)[key]
      return value === undefined || value === null
    })
    return invalidKeys.length === 0
      ? { valid: true }
      : {
          valid: false,
          keys: invalidKeys as Extract<keyof EnvironmentVariables, string>[]
        }
  }
}
/* eslint-enable no-process-env */

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

const environmentsPlugin: Plugin = (_, inject) => {
  const env = { ...environments }
  delete env.validate
  inject('environments', env)
}

export default environmentsPlugin
