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
import {
  computed,
  defineComponent,
  useContext,
  useMeta,
  wrapProperty
} from '@nuxtjs/composition-api'

const useI18n = wrapProperty('$i18n', false)

export default defineComponent({
  name: 'EnvironmentPage',
  setup() {
    const { $config } = useContext()
    const i18n = useI18n()

    // Lifecycle
    useMeta(() => ({ title: i18n.t('title').toString() }))

    // Computed
    const environmentList = computed(() =>
      Object.entries($config).map(([key, value]) => ({ key, value }))
    )

    return { environmentList }
  },
  head: {}
})
</script>
