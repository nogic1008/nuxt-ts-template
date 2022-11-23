import Oruga from '@oruga-ui/oruga'
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import { createLocalVue } from '@vue/test-utils'
import VueI18n from 'vue-i18n'

/** Generate [0-9a-z]{length} string. */
export const randomString = (length: number) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')

export const createVue = () => {
  const localVue = createLocalVue()
  const i18nMethods = {
    methods: {
      localePath: (obj: object) => obj,
      switchLocalePath: (code: string) => code
    }
  }
  localVue.use(Oruga, bulmaConfig)
  localVue.use(VueI18n)
  localVue.mixin(i18nMethods)
  return localVue
}

export const createI18n = (locale = 'en') =>
  new VueI18n({ locale, silentFallbackWarn: true })
