<template>
  <card title="Store Sample" icon="counter">
    <b-button class="plus" icon-left="plus" @click="increment()" />
    <span class="subtitle">{{ count }}</span>
    <b-button class="minus" icon-left="minus" @click="decrement()" />
  </card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Card from '~/components/Card.vue'

@Component({
  components: { Card }
})
export default class CardComponent extends Vue {
  get count() {
    return this.$vxm.counter.count
  }

  increment() {
    this.$vxm.counter.increment()
  }

  decrement() {
    this.$vxm.counter.decrement()
  }
}
</script>
