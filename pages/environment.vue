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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import type { MetaInfo } from 'vue-meta'

@Component
export default class EnvironmentPage extends Vue {
  head(): MetaInfo {
    return { title: this.$t('title').toString() }
  }

  get environmentList() {
    return Object.entries(this.$config)
      .filter(([key, _]) => !!key)
      .map(([key, value]) => ({ key, value }))
  }
}
</script>
