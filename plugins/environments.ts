import { Plugin } from '@nuxt/types'
import { config } from 'dotenv'

config()

export type EnvironmentVariables = {
  NODE_ENV: string
}

/* eslint-disable no-process-env */
export const environments: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!
}
/* eslint-enable no-process-env */

/** Validate environments values. */
export const validateEnvironments = ():
  | { valid: true }
  | { valid: false; keys: Extract<keyof EnvironmentVariables, string>[] } => {
  const invalidKeys: string[] = Object.keys(environments).filter((key) => {
    const value: unknown = (environments as any)[key]
    return value === undefined || value === null || value === ''
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
