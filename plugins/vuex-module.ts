import { Plugin } from '@nuxt/types'
import { VuexTypeModule, vxm } from '~/store'

declare module 'vue/types/vue' {
  interface Vue {
    $vxm: VuexTypeModule
  }
}

const vuexModulePlugin: Plugin = (_, inject) => {
  inject('vxm', vxm)
}

export default vuexModulePlugin
