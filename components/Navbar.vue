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
          <Flag :iso="locale.flag" />
          <span>&nbsp;{{ locale.name }}</span>
        </b-navbar-item>
        <template #label>
          <Flag :iso="selectedLocale.flag" />&nbsp;{{ selectedLocale.name }}
        </template>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script lang="ts" setup>
import { computed, useContext } from '@nuxtjs/composition-api'
import type { LocaleObject } from '@nuxtjs/i18n'

import Flag from '~/components/Flag.vue'

const { i18n } = useContext()

const selectedLocale = computed(
  () =>
    (i18n.locales as (string | LocaleObject)[]).find(
      (l): l is LocaleObject => typeof l === 'object' && l.code === i18n.locale
    )!
)
const availableLocales = computed(
  () =>
    (i18n.locales as (string | LocaleObject)[]).filter(
      (l): l is LocaleObject => typeof l === 'object' && l.code !== i18n.locale
    ) ?? []
)
</script>
