import { Plugin } from '@nuxt/types'

export type EnvironmentVariables = {
  NODE_ENV: string
}

/* eslint-disable no-process-env */
export const environments: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!
}
/* eslint-enable no-process-env */

/** Validate environments values. */
export function validateEnvironments():
  | { valid: true }
  | { valid: false; keys: string[] } {
  const keys: string[] = []
  Object.entries(environments).forEach(([key]) => {
    const value: unknown = (environments as any)[key]
    if (value === undefined || value === null || value === '') {
      keys.push(key)
    }
  })
  return keys.length === 0 ? { valid: true } : { valid: false, keys }
}

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

const environmentsPlugin: Plugin = (_context, inject) => {
  inject('environments', environments)
}

export default environmentsPlugin
