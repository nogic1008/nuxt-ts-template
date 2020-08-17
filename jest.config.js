/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  globals: {
    'vue-jest': {
      transform: {
        i18n: './__tests__/vue-i18n-transformer.js'
      }
    }
  },
  testRegex: '/__tests__/.+\\.(test|spec)\\.[jt]sx?$',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '**/*.vue',
    '!<rootDir>/*.config.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**'
  ]
}
