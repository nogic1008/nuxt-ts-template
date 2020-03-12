<template>
  <div>
    <b-navbar type="is-primary">
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" :to="localePath('/')">
          <img src="~assets/buefy.png" alt="Buefy" height="28" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-dropdown right>
          <template>
            <b-navbar-item
              v-for="locale in availableLocales"
              :key="locale.code"
              tag="nuxt-link"
              :to="switchLocalePath(locale.code)"
            >
              <flag :iso="locale.flag" />
              <span>&nbsp;{{ locale.name }}</span>
            </b-navbar-item>
          </template>
          <template slot="label">
            <flag :iso="selectedLocale.flag" />&nbsp;{{ selectedLocale.name }}
          </template>
        </b-navbar-dropdown>
      </template>
    </b-navbar>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="localePath(item.to)" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RawLocation } from 'vue-router'

import Flag from '~/components/Flag.vue'

type MenuItem = {
  title: string
  icon: string
  to: RawLocation
}

@Component({
  components: { Flag }
})
export default class DefaultLayout extends Vue {
  get selectedLocale() {
    return this.$i18n.locales?.find(
      (i) => typeof i === 'object' && i.code === this.$i18n.locale
    )
  }

  get availableLocales() {
    return this.$i18n.locales?.filter(
      (i) => typeof i === 'object' && i.code !== this.$i18n.locale
    )
  }

  items: MenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
      to: { name: 'index' }
    },
    {
      title: 'Inspire',
      icon: 'lightbulb',
      to: { name: 'inspire' }
    },
    {
      title: 'Environment',
      icon: 'rocket',
      to: { name: 'environment' }
    }
  ]
}
</script>
