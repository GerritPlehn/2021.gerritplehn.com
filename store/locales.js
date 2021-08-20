export const state = () => ({
  currentLocale: 'default',
})

export const mutations = {
  setLocale(state, locale) {
    state.currentLocale = locale
  },
}
