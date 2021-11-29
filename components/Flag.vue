<template>
  <span class="flag-icon" :class="flagIconClass" :title="flagTitle" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FlagComponent',
  props: {
    iso: { type: String, required: true },
    title: { type: String, default: null },
    squared: { type: Boolean, default: false }
  },
  setup(props) {
    // Computed
    const flagIconClass = computed(() => [
      {
        'flag-icon-squared': props.squared
      },
      `flag-icon-${props.iso.toLowerCase()}`
    ])
    const flagTitle = computed(() => props.title || props.iso)

    return { flagTitle, flagIconClass }
  }
})
</script>

<style scoped lang="scss">
$flag-icons-path: '~flag-icon-css/flags';
$include: jp, us;
@import '~flag-icon-css/sass/flag-icons';
</style>
