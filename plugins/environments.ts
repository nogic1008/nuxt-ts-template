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
export const environments: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!,
  BASE_PATH: process.env.BASE_PATH || '/'
}
/* eslint-enable no-process-env */

/** Validate environments values. */
export const validateEnvironments = ():
  | { valid: true }
  | { valid: false; keys: Extract<keyof EnvironmentVariables, string>[] } => {
  const invalidKeys: string[] = Object.keys(environments).filter((key) => {
    const value: unknown = (environments as any)[key]
    return value === undefined || value === null
  })
  return invalidKeys.length === 0
    ? { valid: true }
    : {
        valid: false,
        keys: invalidKeys as Extract<keyof EnvironmentVariables, string>[]
      }
}

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

const environmentsPlugin: Plugin = (_, inject) => {
  inject('environments', environments)
}

export default environmentsPlugin
