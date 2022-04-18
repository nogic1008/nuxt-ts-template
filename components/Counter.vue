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
  <Card :title="$t('title')" icon="counter">
    <o-button class="plus" icon-left="plus" @click="increment()" />
    <span class="subtitle">{{ count }}</span>
    <o-button class="minus" icon-left="minus" @click="decrement()" />
  </Card>
</template>

<script lang="ts" setup>
import { computed, wrapProperty } from '@nuxtjs/composition-api'

import Card from '~/components/Card.vue'

const accessor = wrapProperty('$accessor', false)()

const count = computed(() => accessor.counter.count)
const increment = () => accessor.counter.increment()
const decrement = () => accessor.counter.decrement()
</script>
