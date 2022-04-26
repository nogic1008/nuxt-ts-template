import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'unplugin-vue2-script-setup/jest'
  },
  globals: {
    'vue-jest': {
      transform: {
        i18n: 'vue-i18n-jest'
      }
    }
  },
  testRegex: '/__tests__/.+\\.test.ts$',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.vue',
    '!<rootDir>/*.config.ts',
    '!**/*.d.ts',
    '!**/.nuxt/**',
    '!**/node_modules/**',
    '!**/__tests__/**'
  ]
}
export default config
