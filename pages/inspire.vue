<i18n>
{
  "en": {
    "title": "\"Just start {0}\"",
    "subtitle": "Author: {0}"
  },
  "ja": {
    "title": "\"さあ、始めよう {0}\"",
    "subtitle": "著者: {0}"
  }
}
</i18n>

<template>
  <section class="section">
    <i18n path="title" tag="h2" class="title is-3 has-text-grey">
      <o-icon icon="rocket" size="large" />
    </i18n>
    <i18n path="subtitle" tag="h3" class="subtitle is-6 has-text-grey">
      <a href="https://github.com/anteriovieira">Antério Vieira</a>
    </i18n>
  </section>
</template>

<script lang="ts" setup>
import { defineComponent, useMeta, wrapProperty } from '@nuxtjs/composition-api'

const _i18n = wrapProperty('$i18n', false)()

// Lifecycle
const { title } = useMeta()
title.value = _i18n.t('title').toString().replace(' {0}', '')
</script>

<script lang="ts">
export default defineComponent({ head: {} })
</script>
