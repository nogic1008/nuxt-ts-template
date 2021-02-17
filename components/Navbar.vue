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
import type { NuxtVueI18n } from 'nuxt-i18n'
import { Component, Vue } from 'nuxt-property-decorator'

import Flag from '~/components/Flag.vue'

type Locale = NuxtVueI18n.Options.LocaleObject

@Component({ components: { Flag } })
export default class NavbarComponent extends Vue {
  get selectedLocale() {
    return this.$i18n.locales?.find(
      (l): l is Locale => typeof l === 'object' && l.code === this.$i18n.locale
    )!
  }

  get availableLocales() {
    return (
      this.$i18n.locales?.filter(
        (l): l is Locale =>
          typeof l === 'object' && l.code !== this.$i18n.locale
      ) ?? []
    )
  }
}
</script>
