import { getterTree, mutationTree } from 'typed-vuex'

export const state = () => ({ count: 0 })

export const getters = getterTree(state, {
  count: (state) => state.count
})

export const mutations = mutationTree(state, {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
})
