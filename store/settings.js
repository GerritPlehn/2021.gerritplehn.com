export const state = () => ({
  currentLocale: 'default',
  langsAvailable: [],
  colorScheme: null,
  title: null,
  logo: null,
  navItems: [],
  loaded: false,
  socials: []
})

export const mutations = {
  setLocale(state, locale) {
    state.currentLocale = locale
  },
  setLangsAvailable(state, langsAvailable) {
    state.langsAvailable = langsAvailable
  },
  setColorScheme(state, colorScheme) {
    state.colorScheme = colorScheme
  },
  setTitle(state, title) {
    state.title = title
  },
  setLogo(state, logo) {
    state.logo = logo
  },
  setNavItems(state, navItems) {
    state.navItems = navItems
  },
  setSocials(state, socials) {
    state.socials = socials
  },
  setSettings(state, options) {
    for (let setting of Object.keys(options)) {
      state[setting] = options[setting]
    }
    state.loaded = true
  }
}
