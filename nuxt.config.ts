import { defineNuxtConfig } from '@nuxt/bridge'
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import { config } from 'dotenv'

import pkg from './package.json'

// Setup dotenv
config()

// eslint-disable-next-line no-process-env
const basePath = process.env.BASE_PATH || '/'

export default defineNuxtConfig({
  target: 'static',
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
  loading: { color: '#fff' },
  css: ['@oruga-ui/theme-bulma/dist/bulma.css'],
  modules: [
    // Doc: https://oruga.io/documentation/
    ['@oruga-ui/oruga/nuxt', { includeCss: false, ...bulmaConfig }],
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
  build: {
    loaders: { scss: { sassOptions: { quietDeps: true } } }
  }
})
