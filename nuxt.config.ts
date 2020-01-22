import { Configuration } from '@nuxt/types'
import consola from 'consola'
import pkg from './package.json'
import { validateEnvironments } from './plugins/environments'

// eslint-disable-next-line no-process-env
if (!process.env.CI) {
  const validate = validateEnvironments()
  if (!validate.valid) {
    consola.error(
      `Missing environment variable(s): ${validate.keys.join(', ')}`
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
  plugins: ['~/plugins/environments.ts'],
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
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
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
