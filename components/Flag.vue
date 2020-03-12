<template>
  <span
    v-if="iso"
    class="flag-icon"
    :class="flagIconClass"
    :title="title || iso"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FlagComponent extends Vue {
  @Prop({ type: String, required: true }) iso!: string
  @Prop(String) title: string | undefined
  @Prop({ type: Boolean, default: false }) squared!: boolean

  get flagIconClass() {
    return `${
      this.squared ? 'flag-icon-squared ' : ''
    }flag-icon-${this.iso.toLowerCase()}`
  }
}
</script>

<style scoped src="flag-icon-css/css/flag-icon.min.css"></style>
