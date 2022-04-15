<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <o-icon :icon="icon" size="large" variant="primary" />
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TranslateResult } from 'vue-i18n'

type Props = { title: TranslateResult; icon: string }

const props = defineProps<Props>()
</script>
