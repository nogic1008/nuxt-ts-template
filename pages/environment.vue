<i18n>
{
  "en": {
    "title": "Client-side Environments"
  },
  "ja": {
    "title": "クライアントサイド 環境変数"
  }
}
</i18n>

<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      {{ $t('title') }}
    </h2>
    <ul>
      <li v-for="obj in environmentList" :key="obj.key">
        <b>{{ obj.key }}</b>
        : {{ obj.value }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import {
  computed,
  defineComponent,
  useContext,
  useMeta,
  wrapProperty
} from '@nuxtjs/composition-api'

const { $config } = useContext()
const i18n = wrapProperty('$i18n', false)()

// Lifecycle
const { title } = useMeta()
title.value = i18n.t('title').toString()

// Computed
const environmentList = computed(() =>
  Object.entries($config).map(([key, value]) => ({ key, value }))
)
</script>

<script lang="ts">
export default defineComponent({ head: {} })
</script>
