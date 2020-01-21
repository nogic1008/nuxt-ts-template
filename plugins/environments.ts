import { Plugin } from '@nuxt/types'

export type EnvironmentVariables = {
  NODE_ENV: string
  browser: boolean
  client: boolean
  mode: 'spa' | 'universal'
  modern: boolean
  server: boolean
  static: boolean
}

/* eslint-disable no-process-env */
export const environments: EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV!,
  browser: process.browser!,
  client: process.client!,
  mode: process.mode!,
  modern: process.modern!,
  server: process.server!,
  static: process.static!
}
/* eslint-enable no-process-env */

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}

const environmentsPlugin: Plugin = (_context, inject) => {
  inject('environments', environments)
}

export default environmentsPlugin
