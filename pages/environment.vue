<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      Client-side Environments
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
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class EnvironmentPage extends Vue {
  get environmentList() {
    return Object.entries(this.$environments)
      .filter(([key, _]) => !!key)
      .map(([key, value]) => ({
        key,
        value
      }))
  }
}
</script>
