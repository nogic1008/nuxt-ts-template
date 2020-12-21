<i18n>
{
  "en": {
    "title": "Store Sample"
  },
  "ja": {
    "title": "Store サンプル"
  }
}
</i18n>

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
  components: { Card }
})
export default class CounterComponent extends Vue {
  get count() {
    return this.$accessor.counter.count
  }

  increment() {
    this.$accessor.counter.increment()
  }

  decrement() {
    this.$accessor.counter.decrement()
  }
}
</script>
