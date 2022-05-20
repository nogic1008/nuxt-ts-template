<template>
  <nav aria-label="main navigation" class="navbar is-primary" role="navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" :to="localePath('/')">
        <img src="~assets/logo.png" alt="Oruga" height="28" />
        <b>Oruga</b>
      </nuxt-link>
      <a
        aria-label="menu"
        class="navbar-burger burger"
        role="button"
        tabindex="0"
        @click="toggleActive"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': isOpened }">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <span class="navbar-link" aria-haspopup="true" tabindex="0">
            <Flag :iso="selectedLocale.flag" />&nbsp;{{ selectedLocale.name }}
          </span>
          <div class="navbar-dropdown is-right">
            <nuxt-link
              v-for="locale in availableLocales"
              :key="locale.code"
              class="navbar-item"
              :to="switchLocalePath(locale.code)"
            >
              <Flag :iso="locale.flag" />
              <span>&nbsp;{{ locale.name }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'

import Flag from '~/components/Flag.vue'

const { i18n } = useNuxtApp()

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

const isOpened = ref(false)
const toggleActive = () => {
  isOpened.value = !isOpened.value
}
</script>
