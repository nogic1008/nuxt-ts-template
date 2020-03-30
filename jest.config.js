/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
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
