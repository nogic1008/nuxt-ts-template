import { Module, mutation, VuexModule } from 'vuex-class-component'

export interface Counter {
  count: number
  increment(): void
  decrement(): void
}

@Module({ namespacedPath: 'counter', target: 'nuxt' })
export class CounterStore extends VuexModule implements Counter {
  count = 0

  @mutation increment() {
    this.count++
  }

  @mutation decrement() {
    this.count--
  }
}
