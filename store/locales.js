export const state = () => ({
  currentStory: {},
  currentLocale: 'default',
  loaded: '0',
})

export const mutations = {
  setStory(state, story) {
    state.currentStory = story
    state.loaded = '1'
  },
  setLocale(state, locale) {
    state.currentLocale = locale
  },
}
