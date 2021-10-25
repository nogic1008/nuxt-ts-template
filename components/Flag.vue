<template>
  <span class="flag-icon" :class="flagIconClass" :title="title || iso" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FlagComponent extends Vue {
  @Prop({ type: String, required: true })
  readonly iso!: string

  @Prop(String)
  readonly title: string | undefined

  @Prop({ type: Boolean, default: false })
  readonly squared!: boolean

  get flagIconClass() {
    return [
      {
        'flag-icon-squared': this.squared
      },
      `flag-icon-${this.iso.toLowerCase()}`
    ]
  }
}
</script>

<style scoped lang="scss">
$flag-icon-css-path: '~flag-icon-css/flags';
$include: jp, us;
@import '~flag-icon-css/sass/flag-icons';
</style>
