import type { NuxtConfig } from '@nuxt/types'
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import { config } from 'dotenv'

import pkg from './package.json'

// Setup dotenv
config()

// eslint-disable-next-line no-process-env
const basePath = process.env.BASE_PATH || '/'

const nuxtConfig: NuxtConfig = {
  target: 'static',
  /** Headers of the page */
  head: {
    titleTemplate: `%s - ${pkg.name}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${basePath}favicon.ico`
      },
      {
        rel: 'preload',
        type: 'text/css',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css',
        as: 'style',
        onload: "this.rel='stylesheet'"
      }
    ]
  },
  router: { base: basePath },
  /** Customize the progress-bar color */
  loading: { color: '#fff' },
  /** Global CSS */
  css: ['@oruga-ui/theme-bulma/dist/bulma.css'],
  /** Plugins to load before mounting the App */
  plugins: [],
  /** Nuxt.js dev-modules */
  buildModules: [
    // Doc: https://typescript.nuxtjs.org/
    ['@nuxt/typescript-build', { typeCheck: false }],
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module'
  ],
  /** Nuxt.js modules */
  modules: [
    // Doc: https://oruga.io/documentation/
    ['@oruga-ui/oruga/nuxt', { includeCss: false, ...bulmaConfig }],
    '@nuxtjs/pwa',
    // Doc: https://i18n.nuxtjs.org/
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', flag: 'us', name: 'English' },
      { code: 'ja', iso: 'ja-JP', flag: 'jp', name: '日本語' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    vueI18nLoader: true
  },
  /* eslint-disable no-process-env */
  publicRuntimeConfig: {
    basePath
  },
  privateRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV
  },
  /* eslint-enable no-process-env */
  /** Build configuration */
  build: {
    loaders: { scss: { sassOptions: { quietDeps: true } } }
  }
}

export default nuxtConfig
