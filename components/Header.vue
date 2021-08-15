<template>
  <header class="text-gray-400 body-font">
    <div
      class="
        container
        mx-auto
        flex flex-wrap
        p-5
        flex-col
        md:flex-row
        items-center
      "
    >
      <nuxt-link
        to="/"
        class="
          flex
          title-font
          font-medium
          items-center
          text-gray-900
          dark:text-white
          mb-4
          md:mb-0
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-3 text-xl">Gerrit Plehn</span>
      </nuxt-link>
      <nav
        class="
          md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700
          flex flex-wrap
          items-center
          text-base
          uppercase
          justify-center
        "
      >
        <nuxt-link class="mr-5 hover:text-white" to="/blog">Blog</nuxt-link>
      </nav>
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.locale"
        :to="locale.path"
        >{{ locale.locale }}</nuxt-link
      >
    </div>
  </header>
</template>

<script>
export default {
  props: {
    nav: {
      type: Object,
      required: true,
    },
    languages: {
      type: Object
    }
  },
  computed: {
    navigationTargets() {

    },
    availableLocales() {
      const locales = this.$nuxt.context.store.state.locales
      return locales.paths[locales.currentPath].paths.filter((e) => {
        return e.locale !== locales.currentLocale
      })
    },
  },
  async fetch() {
    const version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'

    let linkReq = await this.$nuxt.context.app.$storyapi.get(`cdn/links/`, {
      version: version,
    })
    let paths = {}
    for (let key in linkReq.data.links) {
      let link = linkReq.data.links[key]
      paths[link.slug] = {
        paths: [{path: link.real_path, locale: 'default'}]
      }
      if (link.alternates) {
        paths[link.slug].paths = paths[link.slug].paths.concat(link.alternates.map((e)=> {
          return {path: '/' + e.lang + '/' + e.path, locale: e.lang}
        }))
      }
    }
    this.$nuxt.context.store.commit('locales/setPaths', paths)
  },
}
</script>
