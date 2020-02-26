import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store/index.ts', () => {
  test('store is instance of Vuex.Store', () => {
    // Arrange

    // Act
    const store = require('~/store/index').store

    // Assert
    expect(store).toBeInstanceOf(Vuex.Store)
  })
})
