import { createModule, mutation } from 'vuex-class-component'

const VuexModule = createModule({
  namespaced: 'counter',
  strict: false,
  target: 'nuxt'
})

export class CounterStore extends VuexModule {
  count = 0

  @mutation increment() {
    this.count++
  }

  @mutation decrement() {
    this.count--
  }
}
