<template>
  <div>
    <Navbar />

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="localePath(item.to)" exact-active-class="is-active">
              <o-icon :icon="item.icon" /> {{ item.title }}
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

<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'
import type { RawLocation } from 'vue-router'

import Navbar from '~/components/Navbar.vue'

type MenuItem = { title: string; icon: string; to: RawLocation }

const items = ref<MenuItem[]>([
  { title: 'Home', icon: 'home', to: { name: 'index' } },
  { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } },
  { title: 'Environment', icon: 'rocket', to: { name: 'environment' } }
])
</script>
