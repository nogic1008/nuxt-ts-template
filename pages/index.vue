<i18n>
{
  "en": {
    "title": {
      "free": "Free",
      "responsive": "Responsive",
      "modern": "Modern",
      "lightweight": "Lightweight"
    },
    "description": {
      "free": "Open source on {0}",
      "responsive": "{0} component is responsive",
      "responsive_0": "Every",
      "modern": "Built with {0} and {1}",
      "lightweight": "No other internal dependency"
    }
  },
  "ja": {
    "title": {
      "free": "無料",
      "responsive": "レスポンシブ デザイン",
      "modern": "モダンUI",
      "lightweight": "軽量"
    },
    "description": {
      "free": "{0} 上でオープンソース開発",
      "responsive": "{0}コンポーネントがレスポンシブ",
      "responsive_0": "すべての",
      "modern": "{0} と {1} で作成",
      "lightweight": "他のライブラリに依存しない"
    }
  }
}
</i18n>

<template>
  <section class="section">
    <div class="columns is-mobile">
      <card :title="$t('title.free')" icon="github">
        <i18n path="description.free">
          <a href="https://github.com/oruga-ui/oruga">GitHub</a>
        </i18n>
      </card>

      <card :title="$t('title.responsive')" icon="cellphone-link">
        <i18n path="description.responsive">
          <b class="has-text-grey">{{ $t('description.responsive_0') }}</b>
        </i18n>
      </card>

      <card :title="$t('title.modern')" icon="alert-decagram">
        <i18n path="description.modern">
          <a href="https://vuejs.org/">Vue.js</a>
          <a href="http://bulma.io/">Bulma</a>
        </i18n>
      </card>

      <card :title="$t('title.lightweight')" icon="arrange-bring-to-front">
        {{ $t('description.lightweight') }}
      </card>

      <counter />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineComponent, useMeta } from '@nuxtjs/composition-api'

import Card from '~/components/Card.vue'
import Counter from '~/components/Counter.vue'
import pkg from '~/package.json'

// Lifecycle
const { title, titleTemplate } = useMeta()
titleTemplate.value = ''
title.value = pkg.name
</script>

<script lang="ts">
export default defineComponent({ head: {} })
</script>
