import Vuex from 'vuex'
import { Counter, CounterStore } from '~/store/counter'

export const store = new Vuex.Store({
  modules: {
    counter: CounterStore.ExtractVuexModule(CounterStore)
  },
  strict: false
})

export interface VuexTypeModule {
  counter: Counter
}

export const vxm: VuexTypeModule = {
  counter: CounterStore.CreateProxy(store, CounterStore)
}
