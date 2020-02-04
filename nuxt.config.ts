import { Configuration } from '@nuxt/types'
import consola from 'consola'
import pkg from './package.json'
import { environments } from './plugins/environments'

// eslint-disable-next-line no-process-env
if (!process.env.CI) {
  const validateResult = environments.validate()
  if (!validateResult.valid) {
    consola.error(
      `Missing environment variable(s): ${validateResult.keys.join(', ')}`
    )
    process.exit(1)
  }
}

const config: Configuration = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name || '',
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
        href: `${environments.BASE_PATH}favicon.ico`
      }
    ]
  },
  router: {
    base: environments.BASE_PATH
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/environments.ts', '~/plugins/vuex-module.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://typescript.nuxtjs.org/
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.org/documentation/
    'nuxt-buefy',
    '@nuxtjs/pwa'
  ],
  /** Set environments object for use by client-side code. */
  env: { ...environments, validate: undefined! },
  /*
   ** Build configuration
   */
  build: {
    extend: (config, _) => {
      config.node = {
        fs: 'empty'
      }
    }
  }
}

export default config
