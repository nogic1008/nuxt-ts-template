import { Plugin } from '@nuxt/types'

import { vxm } from '~/store'

declare module 'vue/types/vue' {
  interface Vue {
    $vxm: typeof vxm
  }
}

const vuexModulePlugin: Plugin = (_, inject) => {
  inject('vxm', vxm)
}

export default vuexModulePlugin
