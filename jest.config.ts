import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!typed-vuex/lib)'],
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
