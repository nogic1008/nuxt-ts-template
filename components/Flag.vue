<template>
  <span class="fi" :class="flagIconClass" :title="flagTitle" />
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
        'fis': props.squared
      },
      `fi-${props.iso.toLowerCase()}`
    ])
    const flagTitle = computed(() => props.title || props.iso)

    return { flagTitle, flagIconClass }
  }
})
</script>

<style scoped lang="scss">
$flag-icons-path: '~flag-icons/flags';
$include: jp, us;
@import '~flag-icons/sass/flag-icons';
</style>
