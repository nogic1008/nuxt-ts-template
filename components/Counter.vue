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
import { computed, defineComponent, getCurrentInstance } from '@nuxtjs/composition-api'

import Card from '~/components/Card.vue'

export default defineComponent({
  name: 'CounterComponent',
  components: { Card },
  setup() {
    const { $accessor } = getCurrentInstance()!.proxy

    // Computed
    const count = computed(() => $accessor.counter.count)

    // Method
    const increment = () => $accessor.counter.increment()
    const decrement = () => $accessor.counter.decrement()

    return { count, increment, decrement }
  }
})
</script>
