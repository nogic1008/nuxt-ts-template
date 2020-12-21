import { getAccessorType } from 'nuxt-typed-vuex'

import * as counter from '~/store/counter'

export const accessorType = getAccessorType({
  modules: { counter }
})
