<i18n>
{
  "en": {
    "title": "User Info"
  },
  "ja": {
    "title": "ユーザー情報"
  }
}
</i18n>

<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      {{ $t('title') }}
    </h2>
    <ul>
      <li v-for="obj in userInfo" :key="obj.key">
        <b>{{ obj.key }}</b>
        : {{ obj.value }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ middleware: 'auth' })
export default class UserPage extends Vue {
  get userInfo() {
    return Object.entries(this.$auth.user!).map(([key, value]) => ({ key, value }))
  }
}
</script>
