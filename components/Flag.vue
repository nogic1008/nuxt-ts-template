<template>
  <span class="fi" :class="flagIconClass" :title="flagTitle" />
</template>

<script lang="ts" setup>
type Props = { iso: string; title?: string | null; squared?: boolean }

const props = withDefaults(defineProps<Props>(), {
  title: null,
  squared: false
})
const flagIconClass = computed(() => [
  { fis: props.squared },
  `fi-${props.iso.toLowerCase()}`
])
const flagTitle = computed(() => props.title || props.iso)
</script>

<style scoped lang="scss">
$flag-icons-path: '~flag-icons/flags';
$include: jp, us;
@import '~flag-icons/sass/flag-icons';
</style>
