/* istanbul ignore file */
import { getAccessorType } from 'typed-vuex'

import * as counter from '~/store/counter'

export const accessorType = getAccessorType({
  modules: { counter }
})
