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
import Card from '~/components/Card.vue'
import useCounter from '~/composables/useCounter'

const { count, increment, decrement } = useCounter()
</script>
