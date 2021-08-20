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
        <span class="ml-3 text-xl">{{ navigation.title }}</span>
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
        <nuxt-link
          class="mr-5 hover:text-white"
          v-for="link in navigation.links"
          :to="link.path"
          :key="link.path"
          >{{ link.name }}</nuxt-link
        >
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
    story: {
      type: Object,
    },
  },
  data() {
    return {
      navigation: {
        logo: null,
        title: null,
        links: [],
      },
    }
  },
  computed: {
    availableLocales() {
      let locales = []
      if (this.story.translated_slugs) {
        locales = this.story.translated_slugs.map((ts) => {
          if (this.story.default_full_slug === 'home') {
            ts.path = ''
          }
          return {
            locale: ts.lang,
            path: '/' + ts.lang + '/' + ts.path,
          }
        })
      }
      locales.push({
        locale: 'default',
        path:
          '/' +
          (this.story.default_full_slug === 'home'
            ? ''
            : this.story.default_full_slug),
      })
      return locales.filter(
        (l) => l.locale !== this.$nuxt.context.store.state.locales.currentLocale
      )
    },
  },
  async fetch() {
    const version =
      this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
        ? 'draft'
        : 'published'

    const linkReq = await this.$nuxt.context.app.$storyapi.get(
      `cdn/stories/navigation`,
      {
        version: version,
        resolve_relations: 'navigation.stories',
      }
    )
    const navSettings = linkReq.data.story.content
    const currentLocale = this.$nuxt.context.store.state.locales.currentLocale

    this.navigation.logo = navSettings.logo
    this.navigation.title = navSettings.title

    for (let story of navSettings.stories) {
      let navItem = {
        path:
          '/' +
          (story.default_full_slug === 'home' ? '' : story.default_full_slug),
        name: story.name,
      }

      if (currentLocale !== 'default' && story.translated_slugs) {
        const locale = story.translated_slugs.filter(
          (ts) => ts.lang === currentLocale
        )
        if (locale.length) {
          navItem = {
            path:
              '/' +
              locale[0].lang +
              '/' +
              (story.default_full_slug === 'home' ? '' : locale[0].path),
            name: locale[0].name,
          }
        }
      }
      this.navigation.links.push(navItem)
    }
  },
}
</script>
