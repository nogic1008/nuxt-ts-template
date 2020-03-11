<template>
  <card :title="$t('title')" icon="counter">
    <b-button class="plus" icon-left="plus" @click="increment()" />
    <span class="subtitle">{{ count }}</span>
    <b-button class="minus" icon-left="minus" @click="decrement()" />
  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Card from '~/components/Card.vue'

@Component({
  components: { Card },
  i18n: {
    messages: {
      en: {
        title: 'Store Sample'
      },
      ja: {
        title: 'Store サンプル'
      }
    }
  }
})
export default class CounterComponent extends Vue {
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
