export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'gp-web-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-dompurify'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    'nuxt-i18n',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.SB_SPACE_TOKEN,
        cacheProvider: 'memory',
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
      },
      {
        code: 'en',
        name: 'English',
      },
    ],
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          articles: 'articles',
          all_articles: 'All Articles',
        },
        de: {
          articles: 'Artikel',
          all_articles: 'Alle Artikel',
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  markdownit: {
    runtime: true, // Support `$md()`
    // preset: 'default',
    // linkify: true,
    // breaks: true,
    // use: [
    //   'markdown-it-div',
    //   'markdown-it-attrs'
    // ]
  },
  colorMode: {
    classSuffix: '',
  },
}
