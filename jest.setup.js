/* eslint-disable no-console */
const actualWarn = console.warn
const spyWarn = jest.spyOn(console, 'warn')
spyWarn.mockImplementation((message, params) => {
  if (
    typeof message === 'string' &&
    /^\[vue-i18n\] Fall back to translate the keypath.+$/.test(message)
  )
    return
  actualWarn(message, params)
})
