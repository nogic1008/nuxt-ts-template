import Vuex from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'

import { CounterStore } from '~/store/counter'

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(CounterStore)
  }
})

export const vxm = {
  counter: createProxy(store, CounterStore)
}
