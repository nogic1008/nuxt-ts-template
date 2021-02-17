import type { NuxtConfig } from '@nuxt/types'
import { config } from 'dotenv'

import pkg from './package.json'

// Setup dotenv
config()

/* eslint-disable no-process-env */
const basePath = process.env.BASE_PATH || '/'
const cliendId = process.env.OAUTH_CLIENT_ID
const clientSecret = process.env.OAUTH_CLIENT_SECRET
const nodeEnv = process.env.NODE_ENV
/* eslint-enable no-process-env */

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
      }
    ]
  },
  router: { base: basePath },
  /** Customize the progress-bar color */
  loading: { color: '#fff' },
  /** Global CSS */
  css: [],
  /** Plugins to load before mounting the App */
  plugins: [],
  /** Nuxt.js dev-modules */
  buildModules: [
    // Doc: https://typescript.nuxtjs.org/
    '@nuxt/typescript-build',
    // Doc: https://typed-vuex.roe.dev/
    'nuxt-typed-vuex'
  ],
  /** Nuxt.js modules */
  modules: [
    // Doc: https://buefy.org/documentation/
    'nuxt-buefy',
    '@nuxtjs/pwa',
    // Doc: https://i18n.nuxtjs.org/
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
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
  auth: {
    redirect: {
      login: '/',
      callback: '/callback'
    },
    strategies: {
      github: { cliendId, clientSecret }
    }
  },
  publicRuntimeConfig: {
    basePath
  },
  privateRuntimeConfig: {
    nodeEnv
  },
  /** Build configuration */
  build: {
    extend: (config, _) => {
      config.node = { fs: 'empty' }
    }
  }
}

export default nuxtConfig
