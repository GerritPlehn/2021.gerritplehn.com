const axios = require('axios')
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
  plugins: ['~/plugins/vue-dompurify', '~/plugins/components'],

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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
  generate: {
    routes: function (callback) {
      const token = process.env.SB_SPACE_TOKEN
      const per_page = 10
      const version = 'published'
      let cache_version = 0

      let page = 1

      // other routes that are not in Storyblok with their slug.
      let routes = ['/'] // adds home directly but with / instead of /home

      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)
        .then((space_res) => {
          // timestamp of latest publish
          cache_version = space_res.data.space.version

          // Call first Page of the Stories
          axios
            .get(
              `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=${version}&per_page=${per_page}&page=${page}&cv=${cache_version}`
            )
            .then((res) => {
              res.data.stories.forEach((story) => {
                if (story.default_full_slug === 'settings') return
                if (story.full_slug != 'home') {
                  routes.push('/' + story.full_slug)
                }
                if (story.translated_slugs) {
                  story.translated_slugs.map((ts) => {
                    if (story.default_full_slug === 'home') {
                      ts.path = ''
                    }
                    routes.push('/' + ts.lang + '/' + ts.path)
                  })
                }
              })

              // Check if there are more pages available otherwise execute callback with current routes.
              const total = res.headers.total
              const maxPage = Math.ceil(total / per_page)
              if (maxPage <= 1) {
                callback(null, routes)
                return
              }

              // Since we know the total we now can pregenerate all requests we need to get all stories
              let contentRequests = []
              for (let page = 2; page <= maxPage; page++) {
                contentRequests.push(
                  axios.get(
                    `https://api.storyblok.com/v2/cdn/stories?token=${token}&version=${version}&per_page=${per_page}&page=${page}`
                  )
                )
              }

              // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
              axios
                .all(contentRequests)
                .then(
                  axios.spread((...responses) => {
                    responses.forEach((response) => {
                      response.data.stories.forEach((story) => {
                        if (story.default_full_slug === 'settings') return
                        if (story.full_slug != 'home') {
                          routes.push('/' + story.full_slug)
                        }
                        if (story.translated_slugs) {
                          story.translated_slugs.map((ts) => {
                            if (story.default_full_slug === 'home') {
                              ts.path = ''
                            }
                            routes.push('/' + ts.lang + '/' + ts.path)
                          })
                        }
                      })
                    })

                    callback(null, routes)
                  })
                )
                .catch(callback)
            })
        })
    },
  },
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
