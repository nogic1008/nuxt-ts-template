<template>
  <b-navbar type="is-primary">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" :to="localePath('/')">
        <img src="~assets/buefy.png" alt="Buefy" height="28" />
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-dropdown right collapsible>
        <b-navbar-item
          v-for="locale in availableLocales"
          :key="locale.code"
          tag="nuxt-link"
          :to="switchLocalePath(locale.code)"
        >
          <flag :iso="locale.flag" />
          <span>&nbsp;{{ locale.name }}</span>
        </b-navbar-item>
        <template #label>
          <flag :iso="selectedLocale.flag" />&nbsp;{{ selectedLocale.name }}
        </template>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Flag from '~/components/Flag.vue'
import { Locale } from '~/types/locale'

@Component({ components: { Flag } })
export default class NavbarComponent extends Vue {
  get selectedLocale() {
    return this.$i18n.locales?.find(
      (i) => typeof i === 'object' && i.code === this.$i18n.locale
    ) as Locale
  }

  get availableLocales() {
    return this.$i18n.locales?.filter(
      (i) => typeof i === 'object' && i.code !== this.$i18n.locale
    ) as Locale[]
  }
}
</script>
